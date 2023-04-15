import express from 'express';
import {
  createUser,
  verify,
  sendOtp,
  loginUser,
  deleteUser,
} from '../../controllers/userController';
import verifVendorJWT from '../../middleware/verifyJWT';

const usersRouter = express.Router();
usersRouter.post('/register', createUser);
usersRouter.post('/login', loginUser);
usersRouter.post('/verify', verifVendorJWT, verify);
usersRouter.get('/sendOtp', verifVendorJWT, sendOtp);
usersRouter.delete('/deleteUser', verifVendorJWT, deleteUser);

export default usersRouter;
