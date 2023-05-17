import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import { product, cart } from '../database/models';

dotenv.config();
// Create endpoint to add products to cart
const addToCart = async (req, res) => {
  try {
    // Check if the user is authenticated
    const { authenticatedBuyer } = req;
    if (!authenticatedBuyer) {
      return res.status(403).json({
        status: 403,
        message: req.t('addtocart_403_msg'),
      });
    }
    // Find if the product is in the database
    // and have quantity > 0, and stock is 'In Stock'
    const Product = await product.findOne({
      where: {
        id: req.params.id,
        quantity: Sequelize.literal('"quantity" > \'0\''),
        stock: 'In Stock',
      },
    });
    // If the product is not found or not available, return a 404 error
    if (!Product) {
      return res.status(404).json({
        status: 404,
        message: `${req.t('addtocart_404_msg')}`,
      });
    }
    // Add the product to the cart table
    await cart.create({
      userId: authenticatedBuyer.id,
      productId: req.params.id,
      quantity: 1,
    });
    // Query carts table for all products associated with the buyer
    const cartProducts = await cart.findAll({
      where: {
        userId: authenticatedBuyer.id.toString(),
      },
      attributes: ['productId'],
    });
    const cartProductsCount = cartProducts.length;
    // Saving the number of products in the cart in the cookie
    res.cookie('cartProductNumber', cartProductsCount);
    // Return success message with the cart details
    return res.status(200).json({
      status: 200,
      message: `${req.t('addtocart_200_msg')} `,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: `${req.t('addtocart_500_msg')}}`,
      Error: error.message,
    });
  }
};
export default { addToCart };
