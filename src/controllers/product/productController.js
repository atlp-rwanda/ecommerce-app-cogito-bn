/* eslint-disable camelcase */
import cloudinary from 'cloudinary';
import { product } from '../../database/models';
import catchAsync from '../../utils/catchAsync';
import imageUpload from '../../middleware/imageUpload';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
const createNewProduct = catchAsync(async (req, res) => {
  const {
    name,
    description,
    price,
    quantity,
    stock,
    carts_id,
    orders_id,
    wishlist_id,
    category_id,
    vendor_id,
    // image,
  } = req.body;
  // Upload the image to Cloudinary
  const reqData = req.body;
  let imageUrl = '';
  if (req.files) {
    const image = await imageUpload(req);
    imageUrl = image.url;
    reqData.image = imageUrl;

    const newItem = await product.create({
      name,
      description,
      price,
      quantity,
      stock,
      carts_id,
      orders_id,
      wishlist_id,
      category_id,
      vendor_id,
      image,
    });

    // Return a success response to the client
    return res.status(201).json({
      status: 201,
      data: newItem,
      message: `${newItem.name} ${req.t('is_added')}`,
    });
  }
});
export default { createNewProduct };
