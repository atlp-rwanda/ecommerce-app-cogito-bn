import {
  wishlist, product, review, vendors,
} from '../database/models';

const { sequelize } = require('../database/models/index');

const index = async (req, res) => {
  const { userId } = req.body;
  try {
    const wishlistProducts = await wishlist.findAll({ include: product, where: { userId } });
    const wishlistWithReviews = await Promise.all(
      wishlistProducts.map(async (item) => {
        const { productId } = item;

        const averageReview = await review.findOne({
          attributes: [[sequelize.fn('AVG', sequelize.col('rating')), 'averageRating']],
          where: { productId },
          raw: true,
        });

        const vendor = await vendors.findOne({
          where: { userId },
        });

        return {
          wishlistItem: item,
          product: item.Product,
          averageReview: averageReview.averageRating || 0,
          vendor,
        };
      }),
    );
    res.json({
      status: 200,
      message: req.t('wishlist_fetched'),
      data: wishlistWithReviews,
    });
  } catch (err) {
    res.json({ status: err.status, message: err.message, data: [] });
  }
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

const empty = async (req, res) => {
  const { userId } = req.body;
  try {
    const deletedItems = await wishlist.destroy({
      where: {
        userId,
      },
      return: true,
    });
    res.status(200).json({
      statusCode: 200,
      message: req.t('wishlist_delete_message'),
      data: deletedItems,
    });
  } catch (error) {
    res.status(500).json({
      status: error.status,
      message: error.message,
    });
  }
};

const deleteOne = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const result = await wishlist.findOne({ where: { id, userId } });
    if (!result) {
      return res.json({ status: 404, message: req.t('product_not_in_wishlist') });
    }

    const deletedItem = await wishlist.destroy({
      where: {
        id,
        userId,
      },
      return: true,
    });

    res.status(200).json({
      statusCode: 200,
      message: req.t('wishlist_item_deleted'),
      data: deletedItem,
    });
  } catch (error) {
    res.status(500).json({
      status: error.status,
      message: error.message,
    });
  }
};

export default {
  index,
  store,
  empty,
  deleteOne,
};
