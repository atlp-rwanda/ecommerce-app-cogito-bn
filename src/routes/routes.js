// This is where routers will be

// tip:
/**
 *
 * A route is a section of Express code that
 * associates an HTTP verb ( GET , POST , PUT , DELETE , etc.),
 * a URL path/pattern, and a function that is called to handle that pattern
 *
 */

import Route from './roleRoute';
import express from 'express';
import { createUser, loginUser } from '../controllers/UserController';
import usersRouter from './API/user';


// Login route

// Create a new user route
router.post('/register', createUser);
router.post('/login', loginUser);

router.use('/users', usersRouter);

const router = express.Router();
router.use("/create", Route)
router.use('/users', usersRouter);
export default router;
