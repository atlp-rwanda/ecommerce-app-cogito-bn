import express from 'express';
import {
  getAllproducts,
  registerProduct,
  findproductByID,
  updateproduct,
  deleteproduct,
} from '../../controllers/products/recommendedController';

const recommendedProRouter = express.Router();
recommendedProRouter.get('/', getAllproducts);
recommendedProRouter.post('/', registerProduct);
recommendedProRouter.get('/:id', findproductByID);
recommendedProRouter.put('/:id', updateproduct);
recommendedProRouter.delete('/:id', deleteproduct);
export default recommendedProRouter;
