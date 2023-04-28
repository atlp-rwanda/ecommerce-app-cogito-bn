import express from 'express';
import CreateNewItem from '../../controllers/product/productController';
// import isUserEnabled from '../../middleware/enableUser';
import { isSeller } from '../../middleware/role';

const productRouter = express.Router();

productRouter.post('/products/add', isSeller, CreateNewItem.createNewProduct);
export default productRouter;
