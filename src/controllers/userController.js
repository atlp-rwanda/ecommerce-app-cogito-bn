import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { user } from '../database/models';

dotenv.config();

export async function loginUser(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: 400,
      message: req.t('not_enough_credentials_for_login'),
    });
  }
  const User = await user.findOne({
    where: {
      email,
    },
  });
  if (!User) {
    return res.status(401).json({
      status: 401,
      message: req.t('user_not_found'),
    });
  }
  if (User.password === password) {
    const accessToken = jwt.sign(
      {
        id: User.id,
        email: User.email,
        name: User.name,
        roleId: User.roleId,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1d' },
    );
    delete User.dataValues.password;
    return res.status(200).json({
      status: 200,
      message: req.t('successful_login'),
      data: User,
      token: accessToken,
    });
  }
  return res.status(401).json({
    status: 401,
    message: req.t('incorrect_password'),
  });
}

export async function createUser(req, res) {
  const {
    name,
    email,
    password,
    phone,
    roleId,
    gender,
    birthdate,
    preferred_language,
    preferred_currency,
    billingAddress,
  } = req.body;
  if (
    !name
    || !email
    || !password
    || !phone
    || !preferred_language
    || !gender
    || !birthdate
    || !billingAddress
    || !preferred_currency
  ) {
    return res.status(400).json({
      status: 400,
      message: req.t('provide_all_details_signup'),
    });
  }
  const emailExists = await user.findOne({
    where: {
      email,
    },
  });
  if (emailExists) {
    return res.status(409).json({
      status: 400,
      message: req.t('account_exists'),
    });
  }
  try {
    const newUser = await user.create(req.body);

    delete newUser.dataValues.password;
    return res.status(201).json({
      status: 201,
      message: req.t('signup-success'),
      data: newUser,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: req.t('server_error'),
      Error: err.message,
    });
  }
}

// Logout
export async function logoutUser(req, res) {
  try {
    // Clear the session
    req.session.destroy((err) => {
      if (err) {
        throw new Error('Failed to destroy session');
      }
      res.clearCookie('sessionID');
      res.status(200).json({ message: req.t('logoutUser_message') });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
