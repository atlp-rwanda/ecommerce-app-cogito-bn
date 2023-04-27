/* eslint-disable indent */
import jwt from 'jsonwebtoken';
import { user } from '../database/models';

export async function loginUser(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: 400,
      message: 'Please provide email, and password to log in!',
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
      message: 'User not found!',
    });
  }
  if (User.password === password) {
    const accessToken = jwt.sign(
      {
        id: User.id,
        email: User.email,
        firstName: User.firstName,
        lastName: User.lastName,
        role: User.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1d' },
    );
    return res.status(200).json({
      status: 200,
      message: 'User logged in successfully',
      data: User,
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
  const emailExists = await user.findOne({
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
    const newUser = await user.create({
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
