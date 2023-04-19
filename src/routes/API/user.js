import express from 'express';
import createUser from '../../controllers/userController.js';
import LoginUser from '../../controllers/loginController.js'


const usersRouter = express.Router();

usersRouter.post('/register', createUser);
usersRouter.post('/login', LoginUser);

export default usersRouter;