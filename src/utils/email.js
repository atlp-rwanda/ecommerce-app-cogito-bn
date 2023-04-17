const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gatarelydie370@gmail.com',
    pass: 'hznvdgnuhsalrroy'
  }
});

const sendPasswordResetEmail = (to, resetToken) => {
  const mailOptions = {
    from: 'gatarelydie370@gmail.com',
    to,
    subject: 'Password Reset',
    text: `You are receiving this email because you (or someone else) have requested a password reset for your account.\n\n
      Please click on the following link or paste it into your browser to complete the process:\n\n
      http://localhost:9090/auth/reset/${resetToken}\n\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n`
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendPasswordResetEmail };
