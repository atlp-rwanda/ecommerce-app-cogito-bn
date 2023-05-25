import express from 'express';
import { getAllUsers, getUserData, updateStatus } from '../controllers/userconroller';
import { isAdmin } from '../middleware/role';

const userRouter = express.Router();
userRouter.get('/users', getAllUsers);
userRouter.get('/users/:id', getUserData);
userRouter.put('/users/status/:id', isAdmin, updateStatus);
export default userRouter;
