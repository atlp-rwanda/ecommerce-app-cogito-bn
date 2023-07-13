import express from 'express';
import multer from 'multer';
import { isSeller } from '../middleware/role';
import { getProduct, updateProduct } from '../controllers/updateProduct';
import isVendorEnabled from '../middleware/enableUser';
import productValidation from '../middleware/product.validator';

const upload = multer();

const productUpdate = express.Router();

productUpdate.get('/product/:id', getProduct); // Fetch product details
productUpdate.put('/product/:id', isSeller, isVendorEnabled, upload.array('image'), updateProduct); // Update product

export default productUpdate;
