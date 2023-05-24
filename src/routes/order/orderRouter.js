import express from 'express';
import { isAdmin, isBuyer } from '../../middleware/role';
import { getOrderStatus, updateOrderStatus } from '../../controllers/order/orderController';

const orderRouter = express.Router();
orderRouter.get('/getStatus/:id', isBuyer, getOrderStatus);
orderRouter.put('/update/:id', isAdmin, updateOrderStatus);

export default orderRouter;
