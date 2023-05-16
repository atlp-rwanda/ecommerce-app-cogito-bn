import express from 'express'
import {
  isSeller,
} from '../middleware/role';
import productController from '../controllers/updateProduct'
import multer from 'multer';


const upload = multer();

const productUpdate = express.Router();

productUpdate.put('/product/:id',isSeller, upload.array('image'), productController.updateProduct)

export default productUpdate;