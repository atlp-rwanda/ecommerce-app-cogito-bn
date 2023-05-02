import express from 'express';
import buyerAuth from '../../middleware/products/buyerAuth';
import {
  findproductByID,
  RecommendedProduct,
} from '../../controllers/products/recommendedController';

const recommendedProRouter = express.Router();
recommendedProRouter.get('/:id', buyerAuth, findproductByID);
recommendedProRouter.get('/recommended/:id', buyerAuth, RecommendedProduct);
export default recommendedProRouter;
