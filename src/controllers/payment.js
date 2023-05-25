import Stripe from 'stripe';
import getOrderDetails from '../middleware/payment/getOrderDetails';
import updateOrderStatus from '../middleware/payment/updateOrderStatus';
import { payments } from '../database/models';
import updateProductQuantity from '../middleware/payment/productUpdateQuantity';
import buyerAuth from '../middleware/buyerAuth';

const secret_key = new Stripe(process.env.STRIPE_SECRET_KEY);
export default async function pay(req, res) {
  try {
    const {
      order_id, cardNumber, expMonth, expYear, cvc,
    } = req.body;
    if (!order_id || !cardNumber || !expMonth || !expYear || !cvc) {
      return res.status(400).send('Invalid request body');
    }
    // Retrieve the order from the database based on the order number
    const order = await getOrderDetails(order_id);
    if (!order) {
      return res.status(404).send('Order not found');
    }
    // Check if the order has already been paid
    if (order.paymentStatus === 'paid') {
      return res.status(400).send('Order already paid');
    }
    // Check if the buyer is authorized to make the payment
    if (!req.authenticatedBuyer || req.authenticatedBuyer.roleId !== 3) {
      return res.status(403).send('Unauthorized access');
    }
    // Create a new Stripe token object to represent the buyer's card
    const token = await secret_key.tokens.create({
      card: {
        number: cardNumber,
        exp_month: expMonth,
        exp_year: expYear,
        cvc,
      },
    });
    // Create a new Stripe charge object to process the payment
    const charge = await secret_key.charges.create({
      amount: order.totalCost * 100,
      currency: 'usd',
      source: token.id,
      description: `Charge for order #${order_id}`,
    });
    // Update the order status in the database to reflect the payment
    const updatedOrder = await updateOrderStatus(order_id, 'paid');
    // Save the payment record in the database
    const paymentRecord = await payments.create({
      orderId: order_id,
      paymentMethod: 'Stripe',
      stripeId: token.id,
      transactionId: charge.id,
    });
    // Send an order confirmation to the frontend
    const confirmation = {
      orderNumber: updatedOrder.order_id,
      totalCost: updatedOrder.totalCost,
      expectedDeliveryDate: updatedOrder.deliveryDate,
    };
    await updateProductQuantity(req, res);
    return res.status(200).send({
      message: 'Payment successful',
      confirmation,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal server error');
  }
}
