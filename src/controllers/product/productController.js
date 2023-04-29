/* eslint-disable camelcase */
import cloudinary.v2 from '../../utils/cloudinary/cloudinary';
import { product } from '../../database/models';
import catchAsync from '../../utils/catchAsync';
import upload from '../../utils/cloudinary/multer'
// import imageUpload from '../../middleware/imageUpload';

const createNewProduct = catchAsync(async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path);

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
    image,
  } = req.body;

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
  // }
});
export default { createNewProduct };
