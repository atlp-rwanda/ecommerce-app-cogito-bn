import { cart, product } from '../database/models';

const index = (req, res) => {
  console.log(req.body);
  const { userId } = req.body;
  cart
    .findAll({ include: product, where: { userId } })
    .then((data) => {
      for (const result of data) {
        result.dataValues.total = result.quantity * parseInt(result.product.price, 10);
      }
      res.json({ status: 200, message: req.t('cart_fetched'), data });
    })
    .catch((err) => {
      res.json({ status: err.status, message: err.message, data: [] });
    });
};

export default { index };
