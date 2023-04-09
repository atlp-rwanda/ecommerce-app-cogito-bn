import express from 'express';
import {
  getAllUsers, getUserData, signIn, updateStatus,
} from '../controllers/userconroller';

const userRouter = express.Router();
userRouter.get('/users', getAllUsers);
userRouter.get('/users/:id', getUserData);
userRouter.put('/users/status/:id', updateStatus);
userRouter.post('/signin', signIn);
export default userRouter;
