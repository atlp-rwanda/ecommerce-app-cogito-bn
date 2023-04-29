/* eslint-disable camelcase */
import { product } from '../../database/models';
import catchAsync from '../../utils/catchAsync';
import CloudUpload from '../../utils/cloudinary/cloudinary';

const createNewProduct = catchAsync(async (req, res) => {
  const {
    name, description, price, quantity, stock, category_id, id,
  } = req.body;
  try {
    const images = await CloudUpload.multi(req.files);
    // console.log(images);

    const newItem = await product.create({
      name,
      description,
      price,
      image: images,
      quantity,
      stock,
      category_id,
      vendor_id: id,
    });

    // Return a success response to the client
    return res.status(201).json({
      status: 201,
      data: newItem,
      message: `${newItem.name} ${req.t('is_added')}`,
    });
  } catch (err) {
    console.log(err.message);
  }
});
export default createNewProduct;
