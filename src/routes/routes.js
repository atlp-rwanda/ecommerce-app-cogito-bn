import express from 'express';
import vendorLogin from '../controllers/authController';
import { createUser, loginUser } from '../controllers/UserController';

const router = express.Router();

// Login route
// router.post('/login', vendorLogin);

// Create a new user route
router.post('/register', createUser);
router.post('/login', loginUser);
export default router;
