import express from 'express';
import {  sendInAppNotification } from '../services/InAppNotificationService';
import {Notification} from '../services/sendEmailNotification'
import { product,vendors } from '../database/models'; // Assuming the model name is ProductModel



const Notificationrouter = express.Router();


Notificationrouter.post('/product-notifications', async (req, res) => {

  try {
    console.log(req.body)

    const { productId, status } = req.body;
    const Product = await product.findOne({where: {id:productId}});
console.log(Product)
    if (!Product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    Product.status = status;
  await Product.save();
const Vendors = Product.vendor_id;
// console.log(Vendors)
    const Vendor = await vendors.findOne({where:{id:Vendors}});
    // console.log(Vendor)
    const email = Vendor.businessEmail;

    if (!Vendor) {
      return res.status(404).json({ error: 'Vendor not found' });
    }

    const emailOptions = {
      to: email,
      subject: 'Product Lifecycle Change',
      text: `The status of your product with ID ${productId} has changed to ${status}.`
    };

    await Notification(emailOptions);

 
    res.status(200).json({ message: 'Product notifications sent successfully' });
  } catch (error) {
    console.error('Error sending product notifications:', error);
    res.status(500).json({ error: 'An error occurred while sending product notifications' });
  }
});

// Export the router
export default  Notificationrouter;
