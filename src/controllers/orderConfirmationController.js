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
      // include: [
      //   {
      //     model: product,
      //   },
      // ],
    });
    console.log(orderDetails);

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
    await orders.update({ trackingNumber }, { where: { order_id: orderId } });
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
