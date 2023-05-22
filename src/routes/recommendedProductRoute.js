import express from 'express';
import buyerAuth from '../middleware/buyerAuth';
import RecommendedProduct from '../controllers/recommendedProductsController';

const recommendedProRouter = express.Router();
recommendedProRouter.get('/recommended/:id', buyerAuth, RecommendedProduct);
export default recommendedProRouter;
