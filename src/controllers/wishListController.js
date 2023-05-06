import { wishlist, product } from '../database/models';

const index = (req, res) => {
  const { userId } = req.body;
  wishlist
    .findAll({ include: product, where: { userId } })
    .then((data) => {
      res.json({ status: 200, message: req.t('wishlist_fetched'), data });
    })
    .catch((err) => {
      res.json({ status: err.status, message: err.message, data: [] });
    });
};

const store = async (req, res) => {
  const { productId, userId } = req.body;
  try {
    const result = await wishlist.findOne({ where: { userId, productId } });
    if (!result) {
      const data = await wishlist.create({ productId, userId });
      return res.json({ status: 200, message: req.t('product_added'), data });
    }
    return res.json({ status: 200, message: req.t('product_already_added'), data: result });
  } catch (err) {
    return res.json({ status: err.status, message: err.message, data: [] });
  }
};
export default { index, store };
