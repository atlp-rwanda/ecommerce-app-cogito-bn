import { Router } from "express";
import { isBuyer } from "../../middleware/role"; 
import emptyCart from "../../controllers/cart/clearCartController"
const shoppingCart = Router()
shoppingCart.delete('/cart/clear',isBuyer, emptyCart.clearCart)

export default shoppingCart