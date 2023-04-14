/* eslint-disable indent */
import jwt from 'jsonwebtoken';
import User from '../database/models/user';

export async function loginUser(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: 400,
      message: 'Please provide email, and password to log in!',
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
      message: 'User not found!',
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
    return res.status(200).json({
      status: 200,
      message: 'User logged in successfully',
      data: user,
      token: accessToken,
    });
  }
  return res.status(401).json({
    status: 401,
    message: 'Incorrect password',
  });
}
export async function createUser(req, res) {
  const {
 firstName, lastName, email, password, phone, role,
} = req.body;
  if (!firstName || !lastName || !email || !password || !phone || !role) {
    return res.status(400).json({
      status: 400,
      message:
        'Please provide firstName, lastName, email, password, phone, and role to create a user!',
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
      message: 'An account with that email already exists!',
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
    return res.status(201).json({
      status: 201,
      message: 'New user created successfully',
      data: newUser,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: 'Server error',
      Error: err.message,
    });
  }
}
