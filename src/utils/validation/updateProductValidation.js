import Joi from 'joi';
import { product } from '../database/models';
import CloudUpload from '../utils/cloudinary/cloudinary';

const updateProduct = async (req, res) => {
  const images = await CloudUpload.multi(req.files);

  const { id } = req.params;
  const { error } = validateProduct(req.body); // Validate the request body
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const item = await product.findByPk(id);
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }

  try {
    const {
      name, description, price, category_id, vendor_id, quantity, stock,
    } = req.body;
    const updatedItem = await item.update({
      name,
      description,
      image: images,
      price,
      category_id,
      vendor_id,
      quantity,
      stock,
    });
    return res.json({ status: 'success', message: 'Item updated', item: updatedItem });
  } catch (error) {
    return res.status(400).json({ error: 'Invalid request body' });
  }
};

function validateProduct(data) {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    category_id: Joi.number().required(),
    vendor_id: Joi.number().required(),
    quantity: Joi.number().required(),
    stock: Joi.string().required(),
  });

  return schema.validate(data);
}

export default { updateProduct };
