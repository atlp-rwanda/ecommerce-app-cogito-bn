import express from 'express';
import usersRouter from './API/user';

import vendorLogin from '../controllers/authController';
import { createUser, loginUser } from '../controllers/UserController';

const router = express.Router();

router.use('/users', usersRouter);

// Login route

// Create a new user route
router.post('/register', createUser);
router.post('/login', loginUser);

export default router;
