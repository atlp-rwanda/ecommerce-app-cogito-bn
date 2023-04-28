import express from 'express';
import {
  createUser,
  verify,
  sendOtp,
  loginUser,
  deleteUser,
} from '../../controllers/userController';
import verifyJWT from '../../middleware/verifyJWT';

const usersRouter = express.Router();
usersRouter.post('/register', createUser);
usersRouter.post('/login', loginUser);
usersRouter.post('/verify', verifyJWT, verify);
usersRouter.get('/sendOtp', verifyJWT, sendOtp);
usersRouter.delete('/deleteUser', deleteUser);

export default usersRouter;
