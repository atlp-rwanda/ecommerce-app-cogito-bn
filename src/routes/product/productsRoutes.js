import express from 'express';
import multer from 'multer';
import CreateNewItem from '../../controllers/product/productController';
// import isUserEnabled from '../../middleware/enableUser';
import { isSeller } from '../../middleware/role';

const upload = multer();

const productRouter = express.Router();

productRouter.post('/add', isSeller, upload.array('image'), CreateNewItem);
export default productRouter;
