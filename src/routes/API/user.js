import express from 'express';
import createUser from '../../controllers/userController';

const usersRouter = express.Router();
usersRouter.post('/register', createUser);

export default usersRouter;
