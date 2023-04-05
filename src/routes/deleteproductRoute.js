import { Router } from 'express';
import productControlle from '../controllers/deleteproductController';
import {
  isAdmin, isSeller, isBuyer, checkPermission,
} from '../middleware/role';

const Route = Router();

Route.delete('/product/:id', isSeller, productControlle.deleteItem);

export default Route;
