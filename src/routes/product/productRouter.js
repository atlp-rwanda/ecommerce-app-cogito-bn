import express from 'express';
import { changeProductAvailability, createProduct, deleteProduct } from '../../controllers/productAvailabilityController';
import verifyJWT from '../../middleware/verifyJWT';
import isVendorEnabled from '../../middleware/enableUser';
import { checkPermission } from '../../middleware/role';

const productRouter = express.Router();
productRouter.post('/availability', verifyJWT, checkPermission('manage products'), isVendorEnabled, changeProductAvailability);
productRouter.post('/create', verifyJWT, checkPermission('manage products'), isVendorEnabled, createProduct);
productRouter.delete('/delete', verifyJWT, checkPermission('manage products'), isVendorEnabled, deleteProduct);

export default productRouter;
