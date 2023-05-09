import { Router } from 'express';

import cartControlle from '../../controllers/cart/updatecartController';
import {
  isAdmin, isSeller, isBuyer, checkPermission,
} from '../../middleware/role';

const Route = Router();

Route.put('/cart/:id', isBuyer, cartControlle.updateCart);

export default Route;
