import express from 'express';
import {
  verify,
  sendOtp,
  deleteUser,
  
} from '../../controllers/vendor/OTPController';
import {createUser,loginUser} from '../../controllers/userController'
import verifyJWT from '../../middleware/verifyJWT';


const usersRouter = express.Router();

usersRouter.post('/verify', verifyJWT, verify);
usersRouter.get('/sendOtp', verifyJWT, sendOtp);
usersRouter.delete('/deleteUser', deleteUser);


usersRouter.post('/register', createUser);
usersRouter.post('/login', loginUser);

usersRouter.delete('/deleteUser', deleteUser);

export default usersRouter;
