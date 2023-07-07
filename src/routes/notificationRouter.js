import express from 'express';

import {
  getAllNotification,
  vendorMarkAllAsRead,
  vendorDeleteNotification,
  vendorMarkAsRead,
} from '../controllers/notificationController';

const NotificationRouter = express.Router();
NotificationRouter.get('/notification/:id', getAllNotification);
NotificationRouter.get('/notification/markAllAsRead/:id', vendorMarkAllAsRead);
NotificationRouter.get('/notification/markAsRead/:id', vendorMarkAsRead);
NotificationRouter.get('/notification/deleteNotification/:id', vendorDeleteNotification);
export default NotificationRouter;
