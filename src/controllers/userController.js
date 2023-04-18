/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
import speakeasy from 'speakeasy';
import dotenv from 'dotenv';
import Bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import User from '../database/models/user';
import decodeJWT from '../utils/token';

dotenv.config();

// create a transporter object
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // use SSL/TLS
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function loginUser(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: 400,
      message: req.t('not_enough_credentials_for_login'),
    });
  }

  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(401).json({
      status: 401,
      message: req.t('user_not_found'),
    });
  }

  if (user.password === password) {
    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1d' },
    );

    delete user.dataValues.password;
    return res.status(200).json({
      status: 200,
      message: req.t('successful_login'),
      data: user,
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
    firstName, lastName, email, password, phone, role,
  } = req.body;
  if (!firstName || !lastName || !email || !password || !phone || !role) {
    return res.status(400).json({
      status: 400,
      message: req.t('provide_all_details_signup'),
    });
  }

  const emailExists = await User.findOne({
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
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      phone,
      role,
    });

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

export async function sendOtp(req, res) {
  const userDetails = decodeJWT(req.headers.authorization);
  // const { id } = req.body;
  const user = await User.findOne({
    where: {
      id: userDetails.id,
    },
  });

  if (!user) {
    return res.status(401).json({
      status: 401,
      message: req.t('user_not_found'),
    });
  }

  // Generate a secret key for the user
  const { base32: secret } = speakeasy.generateSecret({ length: 20 });

  // Generate an OTP for the user
  const token = speakeasy.totp({
    secret,
    encoding: 'base32',
    time: Math.floor(Date.now() / 1000 / 90),
    step: 90,
  });
  const salt = await Bcrypt.genSalt(10);
  const hashedOTP = await Bcrypt.hash(token, salt);
  // define email options
  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: userDetails.email,
    subject: 'Cogito ecommerce app otp',
    text: `Your OTP is ${token}`,
  };

  // send the email
  // eslint-disable-next-line no-unused-vars
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({
        status: 500,
        message: req.t('email_not_sent'),
        Error: error,
      });
    }
  });
  const encodedOTP = Buffer.from(hashedOTP).toString('base64');

  delete user.dataValues.password;
  res.cookie('loginOTP', encodedOTP);
  res.status(200).json({
    status: 200,
    message: req.t('otp_sent'),
    data: user,
    cookie: encodedOTP,
  });
}

export async function verify(req, res) {
  const { otp } = req.body;
  if (!otp) {
    return res.status(400).json({
      status: 400,
      message: req.t('enter_otp'),
    });
  }
  if (req.headers.cookie) {
    const Cookiearray = req.headers.cookie.trim().split(';');
    const cookiesObj = {};
    for (let i = 0; i < Cookiearray.length; i++) {
      const parts = Cookiearray[i].split('=');
      const key = parts[0].trim(); // Trim the key
      const value = parts[1].trim().replace(/=/g, ':');
      cookiesObj[key] = value;
    }
    const hashedOTP = cookiesObj.loginOTP;
    // compare incoming OTP with OTP sent in a cookie
    const decodedOTP = Buffer.from(hashedOTP, 'base64').toString('utf-8');
    const newOtp = otp.trim();
    const isMatch = await Bcrypt.compare(newOtp, decodedOTP);
    if (isMatch) {
      res.cookie('loginOTP', '');

      const userDetails = decodeJWT(req.headers.authorization);
      const user = await User.findOne({
        where: { id: userDetails.id },
      });

      const accessToken = jwt.sign(
        {
          id: userDetails.id,
          email: userDetails.email,
          firstName: userDetails.firstName,
          lastName: userDetails.lastName,
          role: userDetails.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1d' },
      );

      delete user.dataValues.password;

      res.status(200).json({
        status: 200,
        message: req.t('otp_verified'),
        data: user,
        token: accessToken,
      });
    } else {
      return res.status(401).json({
        status: 401,
        message: req.t('otp_invalid'),
      });
    }
  }
}

export async function deleteUser(req, res) {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      status: 400,
      message: req.t('provide_user_email_to_delete'),
    });
  }
  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    return res.status(401).json({
      status: 401,
      message: req.t('user_not_found'),
    });
  }

  try {
    await user.destroy();

    delete user.dataValues.password;

    return res.status(200).json({
      status: 200,
      message: req.t('user_deleted'),
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: req.t('server_error'),
      Error: err.message,
    });
  }
}
