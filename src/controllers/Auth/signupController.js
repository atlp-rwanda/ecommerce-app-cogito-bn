import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import httpStatus from 'http-status';
import { user } from '../../database/models';
import { generateConfirmationCode } from '../../utils/validation/generateCode';
import { hashPassword } from '../../utils/validation/hashedPassword';
// import Response from '../../utils/response';

dotenv.config();
const signUp = async (req, res) => {
  const { email, password } = req.body;
  const confirmationCode = generateConfirmationCode();
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    return Response.errorMessage(res, 'Invalid email address', httpStatus.BAD_REQUEST);
  }
  if (!password || password.length < 8) {
    return Response.errorMessage(
      res,
      'Password must be at least 8 characters long',
      httpStatus.BAD_REQUEST,
    );
  }

  try {
    const hashedPassword = await hashPassword(password);
    const existingUser = await user.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ status: 400, message: req.t('emailAlreadyExists') });
    }

    const newUser = await user.create({
      email,
      password: hashedPassword,
      confirmationCode,
      firstName: 'defaultFirstName',
      lastName: 'defaultLastName',
      role: 'buyer',
    });

    const option = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: 'confirmAccount',
      html: `<p>${'clickLink'} <a href="http://localhost:9999/user/confirm/${confirmationCode}">${'here'}</a> ${'toConfirmAccount'}.</p>`,
    };
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASS,
      },
    });

    const sendEmail = (option) => new Promise((resolve, reject) => {
      transporter.sendMail(option, (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, message: req.t('failedToCreateUser') });
  }
};
export default { signUp };
