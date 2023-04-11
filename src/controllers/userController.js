import dotenv from 'dotenv';
import User from '../database/models/user';
dotenv.config();

const express = require('express')
const app = express()

const createUser = async (req, res) => {
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
  const userExists = await User.findOne({
    where: {
      email,
    },
  });
  if (userExists) {
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
    console.log('user created');
    
    return res
      .status(201)
      .json({
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
};




export default createUser;