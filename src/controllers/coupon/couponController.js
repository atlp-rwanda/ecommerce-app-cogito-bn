/* eslint-disable no-await-in-loop */
/* eslint-disable camelcase */
import { coupon, cart, product } from '../../database/models';

export async function createCoupon(req, res) {
  try {
    const {
      coupon_code,
      discount_type,
      discount_amount,
      discount_percentage,
      minimum_purchase_amount,
      vendorId,
      associated_products,
      start_date,
      end_date,
      usage_limit,
      usage_count,
    } = req.body;

    const existingCoupon = await coupon.findOne({
      where: {
        coupon_code,
      },
    });

    if (existingCoupon) {
      return res.status(409).json({ status: 409, message: req.t('coupon_exists') });
    }

    for (let i = 0; i < associated_products.length; i++) {
      const Product = await product.findOne({
        where: {
          id: associated_products[i],
          vendor_id: vendorId,
        },
      });
      if (!Product) {
        return res.status(401).json({ status: 401, message: req.t('product_not_yours') });
      }
    }

    const newCoupon = await coupon.create({
      coupon_code,
      discount_type,
      discount_amount,
      discount_percentage,
      minimum_purchase_amount,
      vendor_id: vendorId,
      associated_products,
      start_date,
      end_date,
      usage_limit,
      usage_count,
    });

    return res.status(201).json({ status: 201, message: req.t('coupon_created'), data: newCoupon });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: req.t('server_error'), Error: error.message });
  }
}

export async function getAllCoupons(req, res) {
  const { vendorId } = req.body;
  const coupons = await coupon.findAll({
    where: {
      vendor_id: vendorId,
    },
  });
  if (!coupons) {
    return res.status(404).json({ status: 404, message: req.t('vendor-no-coupons') });
  }

  return res.status(200).json({ status: 200, message: req.t('all-coupons'), data: coupons });
}

export async function updateCoupon(req, res) {
  const { id } = req.body;
  if (req.body.coupon_code) {
    const existingCoupon = await coupon.findOne({
      where: {
        coupon_code: req.body.coupon_code,
      },
    });
    if (existingCoupon && existingCoupon.dataValues.id !== id) {
      return res.status(409).json({ status: 409, message: req.t('coupon_update_exists') });
    }
  }
  try {
    const updatedCoupon = await coupon.update(req.body, {
      where: { id },
      returning: true,
    });
    delete req.body.vendorId;
    delete req.body.id;

    return res
      .status(200)
      .json({ status: 200, message: req.t('coupon_updated_message'), data: updatedCoupon[1][0] });
  } catch (error) {
    res.status(500).json({ status: 500, message: req.t('server_error'), Error: error.message });
  }
}

export async function checkout(req, res) {
  try {
    const { coupon_code, totalPrice } = req.body;
    const existingCoupon = await coupon.findOne({
      where: {
        coupon_code,
      },
    });
    if (!existingCoupon) {
      return res.status(404).json({ status: 404, message: req.t('unexisting_coupon') });
    }
    const cartItems = await cart.findAll({
      where: {
        user_id: req.body.userId,
      },
    });
    let newPrice = totalPrice;
    let deductedAmount = 0;
    const newProductsPrices = [];

    for (let i = 0; i < cartItems.length; i++) {
      const item = cartItems[i];
      const { productId } = item.dataValues;
      const Product = await product.findOne({
        where: {
          id: productId,
        },
      });
      if (existingCoupon.dataValues.associated_products.includes(productId)) {
        const today = new Date();
        if (
          item.dataValues.quantity >= existingCoupon.dataValues.minimum_purchase_amount
          && today >= new Date(existingCoupon.dataValues.start_date)
          && today < new Date(existingCoupon.dataValues.end_date)
          && existingCoupon.dataValues.usage_count <= existingCoupon.dataValues.usage_limit
        ) {
          if (existingCoupon.dataValues.discount_type === 'Percentage') {
            const productsPrice = Product.dataValues.price * item.dataValues.quantity;
            deductedAmount = productsPrice * (existingCoupon.dataValues.discount_percentage / 100);
            newPrice -= deductedAmount;
            existingCoupon.dataValues.usage_count += 1;
            const newProdPrice = productsPrice - deductedAmount;
            newProductsPrices.push([productId, newProdPrice]);
          } else {
            const productsPrice = Product.dataValues.price * item.dataValues.quantity;
            deductedAmount = existingCoupon.dataValues.discount_amount;
            newPrice -= deductedAmount;
            const newProdPrice = productsPrice - deductedAmount;
            newProductsPrices.push([productId, newProdPrice]);
          }
        } else {
          const productsPrice = Product.dataValues.price * item.dataValues.quantity;
          newProductsPrices.push([productId, productsPrice]);
        }
      } else {
        const productsPrice = Product.dataValues.price * item.dataValues.quantity;
        newProductsPrices.push([productId, productsPrice]);
      }
    }
    await coupon.update(
      {
        usage_count: existingCoupon.dataValues.usage_count,
      },
      {
        where: {
          coupon_code,
        },
        returning: true,
      },
    );
    const totalDeductedAmount = totalPrice - newPrice;
    return res.status(200).json({
      status: 200,
      message: req.t('coupon_applied'),
      newPrice,
      totalDeductedAmount,
      newProductsPrices,
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: req.t('server_error'), Error: error.message });
  }
}
