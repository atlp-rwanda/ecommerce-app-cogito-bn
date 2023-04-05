import express from 'express';
import buyerAuth from '../middleware/buyerAuth';
import {
  findproductByID,
  RecommendedProduct,
} from '../controllers/recommendedProductsController';

const recommendedProRouter = express.Router();
recommendedProRouter.get('/:id', buyerAuth, findproductByID);
recommendedProRouter.get('/recommended/:id', buyerAuth, RecommendedProduct);
export default recommendedProRouter;
