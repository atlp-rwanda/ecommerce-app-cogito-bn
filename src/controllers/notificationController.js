import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { notification } from '../database/models';
import HeaderComponent from '../utils/_email_/emailHeader';
import FooterComponent from '../utils/_email_/emailFooter';

dotenv.config();
const templateHeader = HeaderComponent;
const templateFotter = FooterComponent;
const addedProductNotify = async (userEmail, userName, productName) => {
  try {
    const notificationEmail = await notification.create({
      subject: 'New Product added',
      message: `Hello ${userName} your product ${productName} was added successfully! `,
      type: 'newProduct',
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
      html: `${templateHeader} <p> Dear <h2> ${userName} </h2> We want to inform you that a new product <b>${productName}</b> has been added into your collection successfully.</p><p>You can Login<a href="${process.env.FN_COGITO_URL}/login"> here</a>.</p> ${templateFotter}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.response}`);
  } catch (error) {
    console.log(error);
  }
};

const deleteProductNotify = async () => {
  try {
    const notificationEmail = await notification.create({
      subject: 'Deleted Product',
      message: 'Hello your product  was deleted into  category successfully',
      type: 'newProduct',
    });
    // Send email to the user
    const transporter = nodemailer.createTransport({
      // Configure the email service here
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_ADDRESS_98,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_ADDRESS_98,
      to: userEmail,
      subject: notificationEmail.subject,
      html: `${templateHeader} <p> Dear <h2> ${userEmail} </h2> We want to inform you new category  deleted by admin, you can add related product on it 🍏</p> ${templateFotter}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.response}`);
  } catch (error) {
    console.log(error);
  }
};
export { addedProductNotify, deleteProductNotify };
