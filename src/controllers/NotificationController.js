import { sendEmailNotification, sendInAppNotification } from '../services/sendEmailNotification';
import product from '../database/models';
import vendor from '../database/models';

const sendProductNotifications = async (req, res) => {
  try {
    const { productId, status } = req.body;

    const Product = await product.findById(productId);

    if (!Product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    product.status = status;
    await product.save();

    const Vendor = await vendor.findById(product.vendorId);

    if (!Vendor) {
      return res.status(404).json({ error: 'Vendor not found' });
    }

    const emailOptions = {
      to: Vendor.email,
      subject: 'Product Lifecycle Change',
      text: `The status of your product with ID ${productId} has changed to ${status}.`
    };

    await sendEmailNotification(emailOptions);

    const inAppNotification = {
      userId: Vendor.userId,
      message: `The status of your product with ID ${productId} has changed to ${status}.`
    };

    await sendInAppNotification(inAppNotification);
  

    res.status(200).json({ message: 'Product notifications sent successfully' });
  } catch (error) {
    console.error('Error sending product notifications:', error);
    res.status(500).json({ error: 'An error occurred while sending product notifications' });
  }
};

export { sendProductNotifications };