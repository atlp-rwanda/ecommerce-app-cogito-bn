import { product } from '../database/models';
import CloudUpload from '../utils/cloudinary/cloudinary';

const getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await product.findByPk(id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    return res.json({ status: 'success', item });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  console.log('________________________________________________');
  console.log(req.files);
  try {
    const images = await CloudUpload.multi(req.files);
    const ImageFiles = await product.findAll({
      where: { id },
      attributes: ['image'],
      raw: true,
    });
    if (images.length > 0) {
      images.forEach((image) => {
        ImageFiles[0].image.push(image);
      });
    }
    console.log(images);
    console.log(ImageFiles);
    const [updatedCount] = await product.update(
      {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: ImageFiles[0].image,
        quantity: req.body.quantity,
        stock: req.body.stock,
        category_id: req.body.category_id,
        vendor_id: id,
        expiredAt: req.body.expiredAt,
      },
      {
        where: { id },
      },
    );

    if (updatedCount === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }

    const updatedItem = await product.findByPk(id);
    return res.json({ status: 'success', message: 'Item updated', item: updatedItem });
  } catch (error) {
    return res.status(400).json({ error: 'Invalid request body' });
  }
};

export { getProduct, updateProduct };
