import express from 'express';
import {
  createUser,
  verify,
  sendOtp,
  loginUser,
} from '../../controllers/userController';
import verifVendorJWT from '../../middleware/verifyJWT';

const usersRouter = express.Router();
usersRouter.post('/register', createUser);
usersRouter.post('/login', loginUser);
usersRouter.get('/verify', verifVendorJWT, verify);
usersRouter.get('/sendOtp', verifVendorJWT, sendOtp);

export default usersRouter;
