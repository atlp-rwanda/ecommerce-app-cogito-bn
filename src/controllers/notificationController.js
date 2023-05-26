import nodemailer from 'nodemailer';
import {notification} from "../database/models"
import dotenv from "dotenv";
dotenv.config();
const templateHeader = `<table style="border-collapse:collapse;border-spacing:0;width:100%;min-width:100%" width="100%" height="auto" cellspacing="0" cellpadding="0" bgcolor="#F0F0F0">
<tbody><tr>
<td style="padding-top:54px;padding-bottom:42px" align="center">
<h2 style="color:#0090c6;font-size: xx-large;">E-commerce ATLP-Cogitto project</h2>
</td>
</tr>
</tbody></table>`

const templateFotter = `<h3>Best regards,</h3>
<h5><i>E-commerce ATLP-Cogito project tam</i></h5>`
const addedProductNotify  = async (userEmail,productName, categoryName) => {
  try {
const notificationEmail = await notification.create({
            subject: `New Product added`,
            message: `Hello ${userEmail} your product ${productName} added into ${categoryName} category successfully  `,
            type: 'newProduct',
            
})
    // Send email to the user
    const transporter = nodemailer.createTransport({
      // Configure the email service here
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_ADDRESS_98,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from:  process.env.EMAIL_ADDRESS_98,
      to: userEmail,
      subject: notificationEmail.subject,
      html: `${templateHeader} <p> Dear <h2> ${userEmail} </h2> We want to inform you new category <b>${category.name}</b>  added by admin, you can add related product on it 🍏</p> ${templateFotter}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.log(error);
  }
};

const deleteProductNotify =async ()=>{
  try {
    const notificationEmail = await notification.create({
                subject: 'Deleted Product',
                message: 'Hello your product  was deleted into  category successfully',
                type: 'newProduct',
                
    })
        // Send email to the user
        const transporter = nodemailer.createTransport({
          // Configure the email service here
          host: "smtp.gmail.com",
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
        console.log('Email sent: ' + info.response);
      } catch (error) {
        console.log(error);
      }


}
export { addedProductNotify  , deleteProductNotify};
