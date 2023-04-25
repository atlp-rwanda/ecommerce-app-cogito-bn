// This is where routers will be

// tip:
/**
 *
 * A route is a section of Express code that
 * associates an HTTP verb ( GET , POST , PUT , DELETE , etc.),
 * a URL path/pattern, and a function that is called to handle that pattern
 *
 */

import express from 'express';
import { createUser, loginUser } from '../controllers/userController';
import usersRouter from './API/user';
import newUserValidation from '../middleware/newUser.validation';

// Login route

// Create a new user route
const router = express.Router();
router.post('/register', newUserValidation, createUser);
router.post('/login', loginUser);
router.use('/users', usersRouter);

export default router;
