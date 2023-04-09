// This is where routers will be

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

const router = express.Router();

<<<<<<< HEAD
router.use('/users', usersRouter);

=======
>>>>>>> admin license to block user account
export default router;
