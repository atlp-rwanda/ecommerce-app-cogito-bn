import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import HeaderComponent from './_email_/emailHeader';
import FooterComponent from './_email_/emailFooter';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});
const sendEmail = async (userName, to, subject, message) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_SENDER,
      to,
      subject,
      html: `${HeaderComponent} <p> Dear <h2> ${userName} </h2> 
      <br> Below is your information, you have provided.<br> ${message} 
      <br>Click <a href="${process.env.FN_COGITO_URL}/login"> here</a> to Login to Cogito Ecommerce.</p> ${FooterComponent}`,
    });

    console.log(`Email sent to ${to}: ${subject}`);
  } catch (error) {
    console.error(`Error sending email to ${to}: ${error}`);
  }
};
export default sendEmail;
