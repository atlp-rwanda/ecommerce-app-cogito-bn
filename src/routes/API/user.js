import express from 'express';
import {
  verify,
  sendOtp,
  deleteUser,
} from '../../controllers/vendor/OTPController';
import verifyJWT from '../../middleware/verifyJWT';

const otpRouter = express.Router();
otpRouter.post('/verify', verifyJWT, verify);
otpRouter.get('/sendOtp', verifyJWT, sendOtp);
otpRouter.delete('/deleteUser', deleteUser);

export default otpRouter;
