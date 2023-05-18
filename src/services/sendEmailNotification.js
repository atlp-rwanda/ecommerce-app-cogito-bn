import nodemailer from 'nodemailer';

export async function Notification(options){
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NOTIFICATION_EMAIL,
        pass: 'hznvdgnuhsalrroy'
      }
    });

    const emailMessage = {
      from: process.env.NOTIFICATION_EMAIL,
      to: options.to,
      subject: options.subject,
      text: options.text
    };

    await transporter.sendMail(emailMessage);

    console.log(`Email notification sent to ${options.to}`);
  } catch (error) {
    console.error('Error sending email notification:', error);
  }
}

export default  Notification ;












