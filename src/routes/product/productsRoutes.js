import express from 'express';
import multer from 'multer';
import CreateNewItem from '../../controllers/product/productController';
import { isSeller } from '../../middleware/role';
import productValidation from '../../middleware/product.validator';
import isUserEnabled from '../../middleware/enableUser';

const upload = multer();

const productRouter = express.Router();
productRouter.post(
  '/add',
  isSeller,
  isUserEnabled,
  upload.array('image'),
  productValidation,
  CreateNewItem,
);

export default productRouter;
