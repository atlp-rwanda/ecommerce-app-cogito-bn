import express from 'express';
import { createUser, loginUser } from '../controllers/UserController';

const router = express.Router();

// Login route

// Create a new user route
router.post('/register', createUser);
router.post('/login', loginUser);
export default router;
