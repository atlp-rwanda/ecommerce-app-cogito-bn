import express from 'express';
import { getAllUsers, getUserData, updateStatus } from '../controllers/userconroller';

const userRouter = express.Router();
userRouter.get('/users', getAllUsers);
userRouter.get('/users/:id', getUserData);
userRouter.put('/users/status/:id', updateStatus);
export default userRouter;
