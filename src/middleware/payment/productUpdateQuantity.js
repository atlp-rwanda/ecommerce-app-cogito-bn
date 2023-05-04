import { cart, product, orders } from '../../database/models';

async function updateProductQuantity(req, res, next) {
  try {
    const { order_id } = req.body;

    // Check if order_id is defined
    if (!order_id) {
      return res.status(400).json({ status: 400, message: 'Order ID is missing' });
    }

    // Retrieve the order
    const existingOrder = await orders.findByPk(order_id);

    // Check if the order exists
    if (!existingOrder) {
      return res.status(400).json({ status: 400, message: 'Order not found' });
    }

    const { buyerId } = existingOrder;

    // Retrieve the carts associated with the buyerId
    const buyerCarts = await cart.findAll({ where: { user_id: buyerId } });

    // Check if there are any carts associated with the buyerId
    if (!buyerCarts || buyerCarts.length === 0) {
      return res.status(400).json({ status: 400, message: 'No carts found for the buyer' });
    }

    // Calculate the actual quantity for each product in the cart
    const actualQuantities = {}; // Object to store the actual quantities

    for (const cartItem of buyerCarts) {
      const { productId, quantity } = cartItem;

      if (!actualQuantities[productId]) {
        actualQuantities[productId] = 0;
      }

      actualQuantities[productId] += quantity;
    }

    const productIds = Object.keys(actualQuantities);

    // Update the quantity and stock status for each product
    for (const productId of productIds) {
      const products = await product.findByPk(productId);
      if (products) {
        const actualQuantity = actualQuantities[productId];

        // Update the quantity
        products.quantity -= actualQuantity;

        // Update the stock status
        if (products.quantity === 0) {
          products.stock = 'Out of Stock';
        }

        // Save the updated product
        await products.save();
      }
    }
  } catch (error) {
    console.error(error);
    next(error); // Pass the error to the error-handling middleware
  }
}

export default updateProductQuantity;
