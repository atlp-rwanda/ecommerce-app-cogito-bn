import { product } from '../database/models';

export async function changeProductAvailability(req, res) {
  try {
    const { productId, vendorId, stockStatus } = req.body;
    if (!productId || !vendorId) {
      return res.status(400).json({
        status: 400,
        message: req.t('provide_details_product_availability'),
      });
    }
    const Product = await product.findOne({
      where: {
        id: productId,
        vendor_id: vendorId,
      },
    });

    if (!Product) {
      return res.status(404).json({
        status: 404,
        message: req.t('product_not_found'),
      });
    }
    let updatedProduct;
    if (Product.dataValues.available === true) {
      if (stockStatus) {
        updatedProduct = await product.update(
          {
            available: false,
            stock: stockStatus,
          },
          {
            where: {
              id: productId,
              vendor_id: vendorId,
            },
            returning: true,
          },
        );
      } else {
        updatedProduct = await product.update(
          {
            available: false,
            stock: 'Out of Stock',
          },
          {
            where: {
              id: productId,
              vendor_id: vendorId,
            },
            returning: true,
          },
        );
      }
      return res.status(200).json({
        status: 200,
        message: req.t('product_availability_updated'),
        data: updatedProduct,
      });
    }
    updatedProduct = await product.update(
      {
        available: true,
        stock: 'In Stock',
      },
      {
        where: {
          id: productId,
          vendor_id: vendorId,
        },
        returning: true,
      },
    );
    return res.status(200).json({
      status: 200,
      message: req.t('product_availability_updated'),
      data: updatedProduct,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: req.t('server_error'),
      Error: err.message,
    });
  }
}

export async function createProduct(req, res) {
  const {
    name, description, image, price, categoryId, vendorId,
  } = req.body;

  // const productExists = await product.findOne({
  //   where: {
  //     name,
  //     vendor_id: vendorId,
  //   },
  // });

  // if (productExists) {
  //   return res.status(409).json({
  //     status: 409,
  //     message: req.t('product_exists'),
  //   });
  // }

  try {
    const newProduct = await product.create({
      name,
      description,
      image,
      price,
      category_id: categoryId,
      vendor_id: vendorId,
    });

    return res.status(201).json({
      status: 201,
      message: req.t('product_created'),
      data: newProduct,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: req.t('server_error'),
      Error: err.message,
    });
  }
}

export async function deleteProduct(req, res) {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({
      status: 400,
      message: req.t('provide_product_id'),
    });
  }
  const Product = await product.findOne({
    where: { id },
  });

  if (!Product) {
    return res.status(404).json({
      status: 404,
      message: req.t('product_not_found'),
    });
  }

  try {
    await Product.destroy();

    return res.status(200).json({
      status: 200,
      message: req.t('product_deleted'),
      data: Product,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: req.t('server_error'),
      Error: err.message,
    });
  }
}
