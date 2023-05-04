import express from 'express';
import { CreatNewMessage, listAllMessages } from '../controllers/chatController';

const chatRouter = express.Router();

chatRouter.get('/messages/all', listAllMessages);
chatRouter.post('/messages/send', CreatNewMessage);

export default chatRouter;
