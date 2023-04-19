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

// import { authenticate } from "../middleware/authMiddleware";

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

      message: 'Retrieved',
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
      return next('User not found', 404);
    }

    return res.status(200).json({
      status: true,

      data: user,

      message: 'Retrieved',
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
        message: 'No user found with that ID',
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
      message: 'status updated successfully',
    });
  } catch (err) {
    res.send(err);
  }
});
// eslint-disable-next-line consistent-return
export const signIn = catchAsync(async (req, res) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email, status: 'active' } });
    if (!user) {
      return res.status(404).json({
        status: 404,

        message: 'your status has been disactivated',
      });
    }

    res.status(200).json({
      status: 200,
      message: 'signed in successfully',
    });
  } catch (err) {
    res.send(err);
  }
});
