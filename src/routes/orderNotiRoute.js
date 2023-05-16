import express from 'express';
import { sendConfirmationEmail } from '../controllers/orderConfirmationController';

const orderNotify = express.Router();

orderNotify.post('/send-confirmation/:orderId', sendConfirmationEmail);

export default orderNotify;
