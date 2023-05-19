import nodemailer from 'nodemailer';

async function sendEmail({ email, subject, content }) {
  const transporter = nodemailer.createTransport({
    host: process.env.HOST_MAILER,
    port: 587,
    secure: false,
    auth: {
      user: process.env.NODE_MAILER_USER,
      pass: process.env.NODE_MAILER_PASS,
    },
  });

  const mailOptions = {
    from: process.env.NODE_MAILER_USER,
    to: email,
    subject,
    html: content,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
}

export default sendEmail;
