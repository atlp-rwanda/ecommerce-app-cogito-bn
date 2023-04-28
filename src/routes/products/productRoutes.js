import express from 'express';
import buyerAuth from '../../middleware/products/buyerAuth';
import vendorAuth from '../../middleware/vendor/vendorAuth';
import {
  getAllproducts,
  registerProduct,
  findproductByID,
  updateproduct,
  deleteproduct,
  RecommendedProduct,
} from '../../controllers/products/recommendedController';

const recommendedProRouter = express.Router();
recommendedProRouter.get('/', buyerAuth, getAllproducts);
recommendedProRouter.post('/', vendorAuth, registerProduct);
recommendedProRouter.get('/:id', buyerAuth, findproductByID);
recommendedProRouter.put('/:id', vendorAuth, updateproduct);
recommendedProRouter.delete('/:id', vendorAuth, deleteproduct);
recommendedProRouter.get('/recommended/:id', buyerAuth, RecommendedProduct);
export default recommendedProRouter;
