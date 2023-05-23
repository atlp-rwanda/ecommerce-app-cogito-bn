import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { validate } from 'deep-email-validator';

dotenv.config();

const sendEmail = async (recipientEmail, emailSubject, emailMessage) => {
  try {
    // Check if recipient email is reachable
    const emailValidity = await validate(recipientEmail);

    if (!emailValidity) {
      return { success: false, error: 'Invalid recipient email' };
    }
    const transporter = nodemailer.createTransport({
      // host: 'smtp.mailtrap.io',
      // port: 2525,
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_SENDER,
      to: recipientEmail,
      subject: emailSubject,
      text: emailMessage,
    };
    const emailInfo = await transporter.sendMail(mailOptions);
    return { success: true, response: emailInfo };
  } catch (errorr) {
    return { success: false, error: errorr };
  }
};

export default sendEmail;
