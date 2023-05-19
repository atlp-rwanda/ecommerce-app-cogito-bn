import { orderServices, emailServices, urlUtils } from '../services';

const OrderConfirmationController = {
  sendConfirmationEmail: async (req, res) => {
    try {
      const { orderId, buyerEmail } = req.body;

      // Get order details and tracking number
      const order = await orderServices.getOrderById(orderId);
      const trackingNumber = orderServices.generateTrackingNumber();

      // Update the order with the tracking number
      await orderServices.updateOrderTrackingNumber(orderId, trackingNumber);

      // Construct the confirmation email content
      const emailContent = constructConfirmationEmail(order, trackingNumber);

      // Send the confirmation email to the buyer's email address
      await emailServices.sendEmail(buyerEmail, 'Order Confirmation', emailContent);

      return res.status(200).json({
        code: 200,
        message: 'Confirmation email sent successfully',
      });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        message: 'Failed to send confirmation email',
        error: error.message,
      });
    }
  },
};

// Helper function to construct the confirmation email content
function constructConfirmationEmail(order, trackingNumber) {
  const orderStatusUrl = urlUtils.getOrderStatusUrl(order.id);

  return `
    <h1>Order Confirmation</h1>
    <p>Thank you for your order!</p>
    <p>Order Details:</p>
    <ul>
      <li>Order ID: ${order.id}</li>
      <li>Tracking Number: ${trackingNumber}</li>
      <!-- Include other order details -->
    </ul>
    <p>You can track the status of your order and view updates on the <a href="${orderStatusUrl}">Order Status Page</a>.</p>
  `;
}

export default OrderConfirmationController;
