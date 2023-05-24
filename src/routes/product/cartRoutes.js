import { Router } from 'express';
import isEnable from '../../middleware/Isenable';
import emptyCart from '../../controllers/cart/clearCartController';

const shoppingCart = Router();
shoppingCart.delete('/cart/clear', isEnable, emptyCart.clearCart);

export default shoppingCart;
