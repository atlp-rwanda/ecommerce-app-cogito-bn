import express from 'express';
import buyerAuth from '../middleware/buyerAuth';
import productCartController from '../controllers/productCartController';

const productCartRouter = express.Router();
productCartRouter
  .route('/cart/add/:id')
  .post(buyerAuth, productCartController.addToCart);
export default productCartRouter;
