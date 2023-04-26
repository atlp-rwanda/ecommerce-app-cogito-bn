import express from 'express';
import {
  createUser,
  verify,
  sendOtp,
  loginUser,
  deleteUser,
} from '../../controllers/UserController';
import verifVendorJWT from '../../middleware/verifyJWT';

const usersRouter = express.Router();
usersRouter.post('/register', createUser);
usersRouter.post('/login', loginUser);
usersRouter.post('/verify', verifVendorJWT, verify);
usersRouter.get('/sendOTP', verifVendorJWT, sendOtp);
usersRouter.delete('/deleteUser', deleteUser);

export default usersRouter;
