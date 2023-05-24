import dotenv from 'dotenv';
import sendEmail from '../utils/sendEmail';
import db from '../database/models';
import catchAsync from '../utils/catchAsync';

dotenv.config();

const User = db.user;
export const getAllUsers = catchAsync(async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt', 'carts_id', 'orders_id', 'wishlists_id'],
      },
    });

    return res.status(200).json({
      status: 200,

      data: users,

      message: req.t('retrieved_all'),
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});
export const getUserData = catchAsync(async (req, res, next) => {
  try {
    const user = await User.findOne({
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt', 'carts_id', 'orders_id', 'wishlists_id'],
      },

      where: { id: req.params.id },
    });

    if (!user) {
      return next(req.t('user_not_found'), 404);
    }

    return res.status(200).json({
      status: true,

      data: user,

      message: req.t('retrieved'),
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});
export const updateStatus = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const user = await User.findOne({ where: { id } });
    if (!user) {
      res.status(404).json({
        status: 404,
        message: req.t('user_not_found'),
      });
    }
    await user.update(
      {
        status,
      },
      { where: { id } },
    );
    if (user.status === 'inactive') {
      await sendEmail(
        user.email,
        `Your status has been updated to ${status}`,
        `Dear ${user.name}, due to violation of our policies, we regret to inform you that your account has been disactivated.`,
      );
    }
    if (user.status === 'active') {
      await sendEmail(
        user.email,
        `Your status has been updated to ${status}`,
        `Hello ${user.name} hope this email finds you well, our team is pleased to inform you that your accout has been reactivated, your can now access all services we provide to you.`,
      );
    }

    res.status(200).json({
      status: 200,
      message: req.t('update_status'),
    });
  } catch (err) {
    res.send(err);
  }
});
