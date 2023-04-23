import express from 'express';
import { createUser, loginUser } from '../controllers/userController';
import usersRouter from './API/user';

const router = express.Router();

// Login route

// Create a new user route
router.post('/register', createUser);
router.post('/login', loginUser);

router.use('/users', usersRouter);

export default router;
