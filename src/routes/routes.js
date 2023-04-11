// tip:
/**
 *
 * A route is a section of Express code that
 * associates an HTTP verb ( GET , POST , PUT , DELETE , etc.),
 * a URL path/pattern, and a function that is called to handle that pattern
 *
 */
import express from 'express';
import usersRouter from './API/user';
const authRoutes = require('./API/SendResetEmail');

const router = express.Router();
router.use('/users', usersRouter);
router.use('/auth', authRoutes);
export default router;