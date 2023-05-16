<<<<<<< HEAD
import { getOrderById } from '../services/orderServices';
import sendEmail from '../services/emailServices';
import urlUtils from '../services/urlUtils';

const OrderConfirmationController = {
  sendConfirmationEmail: async (req, res) => {
    try {
      console.log(req.body);
      const { orderId, buyerEmail } = req.body;
      // Get order details and tracking number
      const order = await getOrderById(orderId); // Remove "orderServices."
      const trackingNumber = generateTrackingNumber(); // Remove "orderServices."
      // Update the order with the tracking number
      await updateOrderTrackingNumber(orderId, trackingNumber); // Remove "orderServices."
      // Construct the confirmation email content
      const emailContent = constructConfirmationEmail(order, trackingNumber);
      // Send the confirmation email to the buyer's email address
      await sendEmail(buyerEmail, 'Order Confirmation', emailContent);
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
=======
import nodemailer from 'nodemailer';
import cron from 'node-cron';
import { orders, product, user } from '../database/models';

const emailSender = process.env.PASSWORD_RESET_EMAIL;
const emailPassword = 'hznvdgnuhsalrroy';
const websiteUrl = process.env.WEB_BASE_URL; // Fetch the website URL from environment variables

// Configure nodemailer with SMTP settings
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: emailSender,
    pass: emailPassword,
  },
});

function generateTrackingNumber() {
  // Generate a unique tracking number for the order
  const trackingNumber = Math.random().toString(36).substring(7).toUpperCase();

  return trackingNumber;
}

async function sendConfirmationEmail(orderId) {
  try {
    // Retrieve the order from the database based on the orderId
    const order = await orders.findOne({ where: { order_id: orderId } });
    // Check if the order has already been paid
    if (order.paymentStatus !== 'paid') {
      throw new Error('Order is not paid');
    }

    // Retrieve buyer's email from the associated user
    const userId = order.buyerId;
    const users = await user.findOne({ where: { id: userId } });
    const buyerEmail = users.email;
    // Generate the tracking number
    const trackingNumber = generateTrackingNumber();
    // Retrieve order details from the database
    console.log(order.order_id);
    const orderDetails = await orders.findOne({
      where: { order_id: order.order_id }, // Use orderId instead of order.order_id
      include: [product],
    });
    console.log('----', orderDetails);

    // Compose the email
    const mailOptions = {
      from: emailSender,
      to: buyerEmail,
      subject: 'Order Confirmation',
      html: `
        <p>Thank you for your order!</p>
        <p>Order details:</p>
        <ul>
          <li>Order Number: ${orderDetails.orderNumber}</li>
          <li>Tracking Number: ${trackingNumber}</li>
        </ul>
        <p>You can track your order by visiting the <a href="${websiteUrl}/order-status/${orderDetails.orderNumber}">order status page</a> on our website.</p>
      `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent:', info.response);

    // Update the order in the database with the tracking number
    await orders.update({ trackingNumber }, { where: { order_id: orderId } }); // Use orderId instead of order.id
    console.log('Order updated with tracking number:', trackingNumber);
  } catch (error) {
    console.log('Error sending confirmation email:', error);
  }
}

function startCronJob() {
  // Schedule the cron job to run every five minutes
  cron.schedule('*/1 * * * *', async () => {
    try {
      // Retrieve paid orders from the database
      const paidOrders = await orders.findAll({ where: { paymentStatus: 'paid' } });

      // Process each paid order
      for (const order of paidOrders) {
        const orderId = order.order_id;

        // Send confirmation email for the paid order
        await sendConfirmationEmail(orderId);
      }
    } catch (error) {
      console.log('Error in cron job:', error);
    }
  });
}

// Start the cron job
startCronJob();

export { generateTrackingNumber, sendConfirmationEmail };
>>>>>>> 3646ba9 ( feat(buyer should receive an order notification))
