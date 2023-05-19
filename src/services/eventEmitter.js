import EventEmitter from 'events';
import db from '../database/models';
import sendEmail from '../utils/sendEmail';

export const eventEmitter = new EventEmitter();
const { user, Notification } = db;

eventEmitter.on('password:updated', async (user) => {
  // send email to user
  const subject = 'Request to change password';
  const text = 'your password needs to be updated. Please change your password for enhanced security.';
  const sendEmails = await sendEmail(user.email, subject, text);
});

export default eventEmitter;
