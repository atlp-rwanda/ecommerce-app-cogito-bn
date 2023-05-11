import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.PASSWORD_RESET_EMAIL,
    pass: 'hznvdgnuhsalrroy',
  },
});

const sendPasswordResetEmail = (to, resetToken) => {
  const mailOptions = {
    from: process.env.PASSWORD_RESET_EMAIL,
    to,
    subject: 'Password Reset',
    text: `You are receiving this email because you (or someone else) have requested a password reset for your account.\n\n
      Please click on the following link or paste it into your browser to complete the process:\n\n
      ${process.env.RESET_URL.replace('${resetToken}', resetToken)}\n\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n`,
  };

  return transporter.sendMail(mailOptions);
};

export default sendPasswordResetEmail;
