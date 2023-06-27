import nodemailer from 'nodemailer';
import HeaderComponent from './_email_/emailHeader';
import FooterComponent from './_email_/emailFooter';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendPasswordResetEmail = (to, userName, resetToken) => {
  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to,
    subject: 'Password Reset',
    html: `${HeaderComponent} <p>Dear ${userName}, </p><p>You are receiving this email because you (or someone else) have requested a password reset for your account.\n\n
      Please click on the following link <a href="${process.env.RESET_URL.replace('${resetToken}', resetToken)}"> here </a> or paste it into your browser to complete the process:\n\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n</p><p> ${FooterComponent}</p>`,
  };

  return transporter.sendMail(mailOptions);
};

export default sendPasswordResetEmail;
