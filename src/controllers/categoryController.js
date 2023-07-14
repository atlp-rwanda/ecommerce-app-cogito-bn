import { Category, product } from '../database/models';

export default async function getCategories(req, res) {
  try {
    const categories = await Category.findAll();
    if (!categories) {
      return res.status(404).json({ status: 404, message: req.t('no_categories') });
    }

    return res
      .status(200)
      .json({ status: 200, message: req.t('all-categories'), data: categories });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: req.t('server_error'), Error: error.message });
  }
}

export async function getProductsByCategory(req, res) {
  const { id } = req.params;
  try {
    const products = await product.findAll({
      where: {
        category_id: id,
      },
    });
    return res
      .status(200)
      .json({ status: 200, message: req.t('category_products'), data: products });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: req.t('server_error'), Error: error.message });
  }
}
