import cron from 'node-cron';
import dotenv from 'dotenv';
import eventEmitter from './eventEmitter';
import models from '../database/models/index.js';

dotenv.config();

const { PASSWORD_EXPIRED_DATE } = process.env;
const { user } = models;

// Update the passwords for users whose passwords have expired
const passwordUpdated = cron.schedule('0 0 * * *', async () => {
  try {
    // Get all users
    const users = await user.findAll();
    // Check if the password has expired for each user
    users.forEach((user) => {
      const now = new Date();
      const lastDate = new Date(user.lastPasswordUpdate);
      const timeElapsed = Math.floor((now - lastDate) / (1000 * 60 * 60 * 24));
      // If the password has expired, trigger the password update event
      if (timeElapsed >= PASSWORD_EXPIRED_DATE) {
        console.log('Triggering password update event for user:', user.id);
        eventEmitter.emit('password:updated', user);
      }
    });
  } catch (error) {
    console.error('Error updating passwords:', error);
  }
});

export { passwordUpdated };
