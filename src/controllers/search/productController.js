import { Op } from 'sequelize';
import { product } from '../../database/models';

const searchProducts = async (req, res) => {
  const {
    name, description, price, id,
  } = req.query;
  try {
    let products;
    if (id && !Number.isNaN(id)) {
      products = await product.findByPk(id, {
        attributes: ['name', 'price', 'category_id', 'description'],
      });
      if (products) {
        res.json(products);
      } else {
        res.json({ message: 'Product not found' });
      }
    } else if (name) {
      products = await product.findAll({
        where: {
          name: { [Op.iLike]: `%${name}%` },
        },
        attributes: ['name', 'price', 'category_id', 'description'],
      });
      if (products.length > 0) {
        res.json(products);
      } else {
        res.json({ message: 'Product not found' });
      }
    } else if (description) {
      products = await product.findAll({
        where: {
          description: { [Op.iLike]: `%${description}%` },
        },
        attributes: ['name', 'price', 'category_id', 'description'],
      });
      if (products.length > 0) {
        res.json(products);
      } else {
        res.json({ message: 'Product not found' });
      }
    } else if (price) {
      products = await product.findAll({
        where: {
          price,
        },
        attributes: ['name', 'price', 'category_id', 'description'],
      });
      if (products.length > 0) {
        res.json(products);
      } else {
        res.json({ message: 'Product not found' });
      }
    } else {
      res.json({ message: 'Product not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default searchProducts;