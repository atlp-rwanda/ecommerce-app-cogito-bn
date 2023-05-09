import { product, cart } from '../../database/models';
import logger from './logger';

const updateCart = async (req, res) => {
  try {
    const { id: userId } = req.params;
    // FETCHING THE PRODUCT ID AND NEW QUANTITY
    const { neededQuantity } = req.body;
    const { id: productId } = req.params;
    // VALIDATING THE QUANTITY
    const { quantity } = await product.findOne({
      where: {
        id: productId,
      },
    });
    if (neededQuantity > quantity) {
      logger.cartLogger.info('/PUT  :User required more quantity than in stock');
      return res.json({
        Message: `The remaining quantity in stock is ${quantity}`,
      });
    }
    // FETCHING THE ITEM
    const cartItem = await cart.findOne({
      where: { productId, userId },
      include: [
        {
          model: product,
          as: 'product',
          attributes: ['name', 'price', 'image'],
        },
      ],
    });
    console.log(cartItem);

    if (!cartItem) {
      logger.cartLogger.error('/PUT statusCode: 404 : Cart item not found');
      return res.status(404).json({
        message: 'Cart item not found',
      });
    }

    // CALCULATING THE NEW TOTAL
    const totalPrice = neededQuantity * cartItem.product.price;
    // UPDATING THE QUANTITY
    await cartItem.update({ quantity: neededQuantity, totalPrice });
    // RETRIEVING THE UPDATED CART
    const updatedCartItem = await cart.findOne({
      where: { productId, userId },
      include: [
        {
          model: product,
          as: 'product',
          attributes: ['name', 'price', 'image'],
        },
      ],
    });

    const cartItems = [updatedCartItem].map((item) => ({
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      totalPrice: item.totalPrice,
      image: item.product.image,
    }));
    // console.log(updatedCartItem.Needed quantity)
    logger.cartLogger.info('/PUT statusCode: 200 : Cart item updated succesfully');
    res.status(200).json({
      message: 'Cart item updated successfully',
      cart: cartItems,
    });
  } catch (error) {
    logger.cartLogger.info(`/PUT statusCode: 500 : Updating cart failed : ${error.message}`);
    return res.status(500).json({
      status: 'Failed to update cart item',
      message: error.message,
    });
  }
};

export default { updateCart };
