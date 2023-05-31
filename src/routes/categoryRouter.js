import express from 'express';
import getCategories from '../controllers/categoryController';

const categoryRouter = express.Router();
categoryRouter.get('/', getCategories);

export default categoryRouter;
