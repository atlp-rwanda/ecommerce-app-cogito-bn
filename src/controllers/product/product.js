import { product } from '../../database/models';
import { checkEmptyFields } from '../../utils/validation/handleEmptyFields';
import catchAsync from '../../utils/catchAsync';
import grabbingImage from '../../utils/grabImages';
import SlugfyFunction from '../../utils/slugfy';

const CreateNewProduct = catchAsync(async (req, res) => {
  const {
    name, description, price, stock, categoryId, expiryDate,
  } = req.body;
  // Check if any fields are empty
  const areAllNotFilled = checkEmptyFields(req, res);
  if (!areAllNotFilled) {
    // Check if a product with the same slug exists
    const existingProduct = await product.findOne({
      where: { slug: SlugfyFunction(name) },
    });
    if (existingProduct) {
      return res.status(409).json({
        status: 409,
        message: req.t('product_duplicate_error'),
      });
    }
    // Grab the image URLs
    const urls = await grabbingImage(req);
    // Create the new product
    const newItem = await product.create({
      name,
      slug: SlugfyFunction(name),
      description,
      price,
      stock,
      category_id: categoryId,
      expiredAt: expiryDate,
    });
    return res.status(201).json({
      status: 201,
      data: newItem,
      message: `${newItem.name} ${req.t('is_added')}`,
    });
  }
});
export default CreateNewProduct;
