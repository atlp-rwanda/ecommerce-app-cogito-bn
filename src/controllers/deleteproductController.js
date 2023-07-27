import { product, user } from '../database/models';
import { addNotification } from './notificationController';

const deleteItem = async (req, res) => {
  const { id } = req.params;
  const specificItem = await product.findOne({
    where: { id },
  });
  try {
    if (specificItem) {
      await product.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({
        statusCode: 200,
        message: req.t('product_delete_message'),
      });
    } else {
      res.status(404).json({
        statusCode: 404,
        message: req.t('productid_unexist_message'),
      });
    }
    const vendor = specificItem.vendor_id;
    const loggedInUser = await user.findOne({ where: { id: vendor } });
    const notificationMessage = {
      subject: 'Product Deletion',
      message: `Hello ${loggedInUser.name}, your product ${specificItem.name} with ID ${specificItem.id}, has been deleted successfully!`,
      type: 'Product Deletion',
      emailBody: `<p> Dear <strong>${loggedInUser.name}</strong>, We want to inform you that your product <strong>${specificItem.name}</strong> with ID <strong>${specificItem.id}</strong>, has been deleted successfully! </p>`,
    };
    await addNotification(loggedInUser.email, loggedInUser.id, notificationMessage);
  } catch (error) {
    res.status(400).json({ statusCode: 400, data: error });
  }
};

export default { deleteItem };
