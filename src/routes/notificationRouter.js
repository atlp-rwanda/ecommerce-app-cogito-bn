import express from 'express';
import { isSeller } from '../middleware/role';

import {
  getAllNotification,
  vendorMarkAllAsRead,
  vendorDeleteNotification,
  vendorMarkAsRead,
} from '../controllers/notificationController';

const NotificationRouter = express.Router();
NotificationRouter.get('/vendor/notification/:id', isSeller, getAllNotification);
NotificationRouter.get('/vendor/markAllAsRead/:id', isSeller, vendorMarkAllAsRead);
NotificationRouter.get('/vendor/markAsRead/:id', isSeller, vendorMarkAsRead);
NotificationRouter.get('/vendor/deleteNotification/:id', isSeller, vendorDeleteNotification);
export default NotificationRouter;
