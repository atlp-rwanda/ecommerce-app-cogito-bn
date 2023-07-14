import express from 'express';
import getCategories, { getProductsByCategory } from '../controllers/categoryController';

const categoryRouter = express.Router();
categoryRouter.get('/', getCategories);
categoryRouter.get('/:id', getProductsByCategory);

export default categoryRouter;
