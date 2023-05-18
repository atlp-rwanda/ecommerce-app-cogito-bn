import { product } from '../database/models';

const productExists = async (req, res, next) => {
  const { productId } = req.body;
  const result = await product.findOne({ where: { id: productId } });
  if (result) {
    next();
  } else {
    res.status(404).json({ status: 404, message: req.t('product_not_found'), data: {} });
  }
};

export default productExists;
