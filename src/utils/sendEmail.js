import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS_STATUS,
    pass: process.env.EMAIL_PASSWORD_STATUS,
  },
});

const sendEmail = async (to, subject, message) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_ADDRESS,
      to,
      subject,
      text: message,
    });

    console.log(`Email sent to ${to}: ${subject}`);
  } catch (error) {
    console.error(`Error sending email to ${to}: ${error}`);
  }
};
export default sendEmail;
