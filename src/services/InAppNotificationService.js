import InAppNotificationService from '../services/InAppNotificationService';


const sendInAppNotification = (notification) => {
  try {
    const inAppNotificationService = new InAppNotificationService();
    inAppNotificationService.sendNotification(notification.userId, notification.message);
  } catch (error) {
    console.error('Error sending in-app notification:', error);
  }
};

export { sendInAppNotification };
