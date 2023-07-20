import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { notification } from '../database/models';
import HeaderComponent from '../utils/_email_/emailHeader';
import FooterComponent from '../utils/_email_/emailFooter';

dotenv.config();
const templateHeader = HeaderComponent;
const templateFotter = FooterComponent;
const addNotification = async (userEmail, userId, Message) => {
  try {
    const notificationEmail = await notification.create({
      subject: `${Message.subject}`,
      message: `${Message.message}`,
      type: `${Message.type}`,
      userId,
      isRead: false,
    });
    // Send email to the user
    const transporter = nodemailer.createTransport({
      // Configure the email service here
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: userEmail,
      subject: notificationEmail.subject,
      html: `${templateHeader} ${Message.emailBody} <p>You can Login<a href="${process.env.FN_COGITO_URL}/login"> here</a>, to make a followup</p> ${templateFotter}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.response}`);
  } catch (error) {
    console.log(error);
  }
};
const getAllNotification = async (req, res) => {
  try {
    const ID = req.params.id.toString();
    const Notifications = await notification.findAll({
      where: { userId: ID },
      order: [
        ['isRead', 'ASC'],
        ['createdAt', 'DESC'],
      ],
    });
    if (!Notifications) {
      return res.status(404).json({
        status: 404,
        message: req.t('notification_404_message'),
      });
    }
    return res.status(200).json({
      status: 200,
      message: req.t('notification_200_message'),
      notifications: Notifications,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: 500, error: req.t('notification_500_message') });
  }
};

const vendorMarkAllAsRead = async (req, res) => {
  try {
    const [numUpdated] = await notification.update(
      { isRead: true },
      { where: { userId: req.params.id } },
    );

    if (numUpdated > 0) {
      res.status(200).json({ message: 'Updated All Notification Status Successfully!!' });
    } else {
      res.status(404).json({ error: 'No notification found with the provided User ID' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to Mark All Notification As Read' });
  }
};
const vendorMarkAsRead = async (req, res) => {
  try {
    const [numUpdated] = await notification.update(
      { isRead: true },
      { where: { id: req.params.id } },
    );

    if (numUpdated > 0) {
      res.status(200).json({ message: 'Updated Notification Status Successfully!!' });
    } else {
      res.status(404).json({ error: 'No notification found with the provided ID' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to Mark Notification As Read' });
  }
};

const vendorDeleteNotification = async (req, res) => {
  try {
    const notice = await notification.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!notice) {
      return res.status(404).json({
        status: 404,
        message: req.t('notification_404_message'),
      });
    }
    await notice.destroy();
    return res.status(200).json({
      status: 200,
      message: req.t('Notification deleted successfully'),
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: req.t('Error deleting notification') });
  }
};

export {
  addNotification,
  getAllNotification,
  vendorMarkAllAsRead,
  vendorDeleteNotification,
  vendorMarkAsRead,
};
