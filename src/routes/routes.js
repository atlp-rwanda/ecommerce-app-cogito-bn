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
import usersRouter from './API/user';

router.use('/users', usersRouter);


const router = express.Router();
router.use("/create", Route)
export default router;
