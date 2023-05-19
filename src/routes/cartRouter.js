import express from 'express';
import cartController from '../controllers/cartController';
import { isBuyer } from '../middleware/role';

const cartRouter = express.Router();

cartRouter.route('/').get(isBuyer, cartController.index);

export default cartRouter;
