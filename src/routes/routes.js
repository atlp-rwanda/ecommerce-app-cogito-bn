import express from 'express';
import { createNewUser, loginUser } from '../controllers/userController';
import usersRouter from './API/user';

const router = express.Router();

router.use('/users', usersRouter);

router.post('/register', createNewUser);
router.post('/login', loginUser);

export default router;
