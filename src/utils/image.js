import cloudinary from 'cloudinary';
import catchAsync from '../../utils/catchAsync';
// Set up Cloudinary credentials
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
  } = req.body;
  try {
    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    const image = result.secure_url;
    // Create the new product in the database
    const newItem = await product.create({
      name,
      description,
      image,
      price,
      quantity,
      stock,
      carts_id,
      orders_id,
      wishlist_id,
      category_id,
      vendor_id,
    });
    return res.status(201).json({
      status: 201,
      data: newItem,
      message: `${newItem.name} ${req.t('is_added')}`,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: 500,
      message: 'Internal server error',
    });
  }
});
export default createNewProduct;
