import express from 'express';
import multer from 'multer';
import CreateNewItem from '../../controllers/product/productController';
import { isSeller } from '../../middleware/role';
import productValidation from '../../middleware/product.valitator';

const upload = multer();

const productRouter = express.Router();

productRouter.post('/add', isSeller, upload.array('image'), productValidation, CreateNewItem);
export default productRouter;
