import express from 'express';
import multer from 'multer';
import CreateNewItem from '../../controllers/product/productController';
import productValidation from '../../middleware/product.validator';
import { isSeller, checkPermission } from '../../middleware/role';
import {
  changeProductAvailability,
  deleteProduct,
  getAvailableProducts,
  getUnavailableProducts,
} from '../../controllers/product/productAvailabilityController';
import {
  getAllProducts,
  findproductByID,
} from '../../controllers/productController';
import verifyJWT from '../../middleware/verifyJWT';
import isVendorEnabled from '../../middleware/enableUser';
import buyerAuth from '../../middleware/buyerAuth';

const upload = multer();

const productRouter = express.Router();
productRouter.post(
  '/add',
  isSeller,
  isVendorEnabled,
  upload.array('image'),
  productValidation,
  CreateNewItem,
);
productRouter.post(
  '/availability',
  verifyJWT,
  checkPermission('manage products'),
  isVendorEnabled,
  changeProductAvailability,
);
productRouter.delete(
  '/delete',
  verifyJWT,
  checkPermission('manage products'),
  isVendorEnabled,
  deleteProduct,
);
productRouter.post(
  '/available',
  verifyJWT,
  checkPermission('manage products'),
  isVendorEnabled,
  getAvailableProducts,
);
productRouter.post(
  '/unavailable',
  verifyJWT,
  checkPermission('manage products'),
  isVendorEnabled,
  getUnavailableProducts,
);
productRouter.get('/buyer', getAllProducts);
productRouter.get('/buyer/:id', buyerAuth, findproductByID);
export default productRouter;
