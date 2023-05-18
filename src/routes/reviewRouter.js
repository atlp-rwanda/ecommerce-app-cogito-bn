import express from 'express';
import reviewController from '../controllers/reviewController';
import { isBuyer } from '../middleware/role';
import reviewValidator from '../middleware/review.validator';
import productExists from '../middleware/product.exists';

const reviewRouter = express.Router();

reviewRouter.route('/').post(isBuyer, reviewValidator, productExists, reviewController.store);

export default reviewRouter;
