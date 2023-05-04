import express from 'express';
import buyerAuth from '../../middleware/buyerAuth';
import pay from '../../controllers/payment';
import checkout from '../../controllers/cart/checkoutController';

const payment = express.Router();
payment.post('/', buyerAuth, checkout);
payment.post('/pay', buyerAuth, pay);
export default payment;
