import express from 'express';
import multer from 'multer';
import { isSeller } from '../middleware/role';
import { getProduct, updateProduct } from '../controllers/updateProduct';

const upload = multer();

const productUpdate = express.Router();

productUpdate.get('/product/:id', getProduct); // Fetch product details
productUpdate.put('/product/:id', isSeller, upload.array('image'), updateProduct); // Update product

export default productUpdate;
