import { product } from '../database/models';

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const specificItem = await product.findOne({
      where: { id },
    });
    if (!id) {
      return res.status(404).json({
        status: '404',
        message: req.t('Missing id parameter in request'),
      });
    }
    if (!specificItem) {
      return res.status(404).json({
        status: '404',
        message: req.t('Product not found'),
      });
    }
    if (!specificItem.stock === 'In Stock') {
      return res.status(404).json({
        status: '404',
        message: req.t('Product not available for sale'),
      });
    }
    if (req.user && req.user.role.roleName === 'user' && req.user.id !== specificItem.userId) {
      return res.status(403).json({
        status: '404',
        message: req.t('You are not allowed to perform this operation'),
      });
    }
    res.status(200).json({
      status: '200',
      item: specificItem,
    });
  } catch (err) {
    res.status(500).json({
      status: '500',
      message: err.message,
    });
  }
};
export default getProductById;
