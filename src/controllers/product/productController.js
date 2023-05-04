import { product } from '../../database/models';
import CloudUpload from '../../utils/cloudinary/cloudinary';

const createNewProduct = async (req, res) => {
  const {
    name, description, price, quantity, stock, category_id, expiryDate,
  } = req.body;
  const id = req.vendor;
  try {
    const images = await CloudUpload.multi(req.files);

    const productCheck = await product.findOne({
      where: {
        name: req.body.name,
      },
    });
    if (productCheck) {
      res.status(409).json({ status: 409, message: req.t('product_duplicate_error') });
    }
    const result = await product.findOne({ where: { id, name } });
    if (!result) {
      const newItem = await product.create({
        name,
        description,
        price,
        image: images,
        quantity,
        stock,
        category_id,
        vendor_id: id,
        expiredAt: expiryDate,
      });

      // Return a success response to the client
      res.status(201).json({
        status: 201,
        data: newItem,
        message: `${newItem.name} ${req.t('is_added')}`,
      });
    }
  } catch (err) {
    console.log(err.message);
  }
};
export default createNewProduct;
