import { product, cart } from '../../database/models';

const updateCart = async (req, res) => {
  try {
    const { neededQuantity, userId } = req.body;
    const { id: productId } = req.params;

    const productData = await product.findOne({
      where: {
        id: productId,
      },
    });

    if (!productData) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }
    const { quantity } = productData;

    if (neededQuantity > quantity) {
      return res.status(400).json({
        message: `You are not allowed to purchase more than ${quantity} products`,
      });
    }
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

    if (!cartItem) {
      return res.status(404).json({
        message: req.t('cart-not_found'),
      });
    }

    await cartItem.update({ quantity: neededQuantity });
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
      totalPrice: item.quantity * item.product.price,
      image: item.product.image,
    }));

    res.status(200).json({
      message: req.t('cart_updated'),
      cart: cartItems,
    });
  } catch (error) {
    return res.status(500).json({
      status: req.t('cart_update_failed'),
      message: error.message,
    });
  }
};

export default { updateCart };
