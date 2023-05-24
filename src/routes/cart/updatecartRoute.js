import { Router } from 'express';
import { updateCartValidation } from '../../middleware/updateCart.validation';
import cartControlle from '../../controllers/cart/updatecartController';
import {
  isAdmin, isSeller, isBuyer, checkPermission,
} from '../../middleware/role';

const Route = Router();

Route.put('/cart/:id', updateCartValidation, isBuyer, cartControlle.updateCart);

export default Route;
