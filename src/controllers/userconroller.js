import nodemailer from 'nodemailer';
import db from '../database/models/index';
import catchAsync from '../utils/catchAsync';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'charlesntwari2@gmail.com',
    pass: 'orvilqiccnltvonu',
  },
});

const User = db.user;
export const getAllUsers = catchAsync(async (req, res) => {
  // console.log(User);
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt', 'carts_id', 'orders_id', 'wishlists_id'],
      },
    });

    return res.status(200).json({
      status: 200,

      data: users,

      message: req.t('retrievedAll'),
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
      return next(req.t('fail'), 404);
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
// eslint-disable-next-line consistent-return
export const updateStatus = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: req.t('failId'),
      });
    }
    await user.update(
      {
        status,
      },
      { where: { id } },
    );
    await transporter.sendMail({
      from: 'charlesntwari2@gmail.com',
      to: user.email,
      subject: `Your status has been updated to ${status}`,
      text: `Dear ${user.firstName}, your status has been updated to ${status}.`,
    });
    console.log(`Email sent to ${user.email}`);
    res.status(200).json({
      status: 200,
      message: req.t('updateStatus'),
    });
  } catch (err) {
    res.send(err);
  }
});
