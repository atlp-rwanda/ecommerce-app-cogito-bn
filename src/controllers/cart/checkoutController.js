import { cart, user, orders, product } from '../../database/models';
import pay from '../payment';

export default async function checkout(req, res) {
  try {
    // Check if the user is logged in
    const { userId } = req.body;
    if (!userId) {
      return res.status(401).send('User not authenticated');
    }

    // Retrieve the cart associated with the user ID
    const userCart = await cart.findAll({ where: { user_id: userId } });
    if (!userCart) {
      return res.status(404).send('Cart not found');
    }

    // Retrieve the cart items from the database
    const cartItems = await cart.findAll({ where: { user_id: userId } });
    if (!cartItems || cartItems.length === 0) {
      return res.status(404).send('Cart is empty');
    }

    const productIds = cartItems.map(item => item.productId);
    const users = await user.findByPk(userId);
    if (!users) {
      return res.status(404).send('User not found');
    }

    // Find all products in the cart
    const products = await product.findAll({ where: { id: productIds } });
    if (!products || products.length === 0) {
      return res.status(404).send('Products not found');
    }

    // Calculate the total cost based on the cart items
    let totalCost = 0;
    const orderItems = [];

    for (const item of cartItems) {
      const product = products.find(p => p.id === item.productId);
      if (!product) {
        return res.status(404).send('Product not found');
      }

      const itemQuantity = parseInt(item.quantity, 10);
      const itemTotal = product.price * itemQuantity;
      totalCost += itemTotal;

      orderItems.push(product);
    }
    const existingOrder = await orders.findOne({ where: { buyerId: req.authenticatedBuyer.id, paymentStatus: 'paid' } });
    if (existingOrder) {
      return res.status(400).send('Order has already been processed');
    }
    // Create the order in the database with a "pending" status and the shipping address
    const order = await orders.create({
      buyerId: userId,
      totalCost: totalCost,
      paymentStatus: 'pending',
      productId: productIds,
      shippingAddress: users.billingAddress, // billing address contains shipping information
      shippingStatus: 'pending',
    });
    return res.status(200).header('x-error', 'false').json({
      message: order,
    });
    
    try {
      await pay(req, res);
    } catch (error) {
      console.error(error);
      // Handle any errors that occur during the payment process
      res.status(500).send('Error processing payment');
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal server error');
  }
}
