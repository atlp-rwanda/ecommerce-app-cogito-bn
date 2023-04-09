import { user } from '../../database/models';
import { generateConfirmationCode } from '../../utils/validation/generateCode';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { hashPassword } from '../../utils/validation/hashedPassword';
import Response from '../../utils/response';
import httpStatus from 'http-status-codes';
dotenv.config();
const signUp = async (req, res) => {
  const { email, password } = req.body;
  const confirmationCode = generateConfirmationCode();
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    return Response.errorMessage(
      res,
      'Invalid email address',
      httpStatus.BAD_REQUEST
    );
  }
  if (!password || password.length < 8) {
    return Response.errorMessage(
      res,
      'Password must be at least 8 characters long',
      httpStatus.BAD_REQUEST
    );
  }
  try {
    const hashedPassword = await hashPassword(password);
    const existingUser = await  user.findOne({ where: { email } });
    if (existingUser) {
      return Response.errorMessage(
        res,
        'Email already exists',
        httpStatus.BAD_REQUEST
      );
    }
    const newUser = await  user.create({
      email,
      password: hashedPassword,
      confirmationCode,
      firstName: 'defaultFirstName',
      lastName: 'defaultLastName',
      role: 'buyer',
    });
    const option = {
      from: 'djanatiuwase@gmail.com',
      to: email,
      subject: 'Confirm your account',
      html: `<p>Please click <a href="http://localhost:9999/user/confirm/${confirmationCode}">here</a> to confirm your account.</p>`,
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
    transporter.sendMail(option, (error, info) => {
      if (error) {
        return Response.errorMessage(
          res,
          'Failed to send confirmation email',
          httpStatus.INTERNAL_SERVER_ERROR
        );
      }
      console.log(`Email sent: ${email}`);
      return Response.successMessage(
        res,
        'User created successfully',
        httpStatus.OK
      );
    });
  } catch (error) {
    console.log(error);
    return Response.errorMessage(
      res,
      'Failed to create user',
      httpStatus.INTERNAL_SERVER_ERROR
    );
  }
};
export default { signUp };