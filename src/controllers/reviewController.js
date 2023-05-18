import { Op } from 'sequelize';
import { review } from '../database/models';

const store = async (req, res) => {
  const {
    userId, productId, rating, message,
  } = req.body;
  const existing = await review.findOne({
    where: {
      [Op.and]: [{ productId }, { userId }],
    },
  });
  if (existing) {
    res.status(200).json({ status: 200, message: req.t('review_exists'), data: existing });
  } else {
    try {
      const productReview = await review.create({
        userId,
        productId,
        rating,
        review: message,
      });
      res.status(200).json({ status: 200, message: req.t('review_added'), data: productReview });
    } catch (error) {
      res.status(error.status).json({ status: error.status, message: error.message, data: {} });
    }
  }
};

export default { store };
