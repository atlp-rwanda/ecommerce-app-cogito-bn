import express from 'express';
import { verify, sendOtp, deleteUser } from '../../controllers/vendor/OTPController';
import verifVendorJWT from '../../middleware/verifyJWT';

const usersRouter = express.Router();
usersRouter.post('/verify', verifVendorJWT, verify);
usersRouter.get('/sendOtp', verifVendorJWT, sendOtp);
usersRouter.delete('/deleteUser', deleteUser);

export default usersRouter;
