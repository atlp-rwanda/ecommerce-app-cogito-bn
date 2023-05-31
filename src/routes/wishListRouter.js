import express from 'express';
import wishListController from '../controllers/wishListController';
import { isBuyer } from '../middleware/role';
import wishlistValidator from '../middleware/wishlist.validator';

const wishListRouter = express.Router();

wishListRouter
  .route('/')
  .get(isBuyer, wishListController.index)
  .post(isBuyer, wishlistValidator, wishListController.store)
  .delete(isBuyer, wishListController.empty);

wishListRouter
  .route('/:id')
  .delete(isBuyer, wishListController.deleteOne);

export default wishListRouter;
