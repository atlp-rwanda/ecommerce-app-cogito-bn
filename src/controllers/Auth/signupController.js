import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { user, role } from '../../database/models';
import { generateConfirmationCode } from '../../utils/validation/generateCode';
import { hashPassword } from '../../utils/validation/hashedPassword';
import HeaderComponent from '../../utils/_email_/emailHeader';
import FooterComponent from '../../utils/_email_/emailFooter';

dotenv.config();
const signUp = async (req, res) => {
  const { email, password, name } = req.body;
  const confirmationCode = generateConfirmationCode();
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ status: 400, message: req.t('invalidEmail') });
  }
  if (!password || password.length < 8) {
    return res.status(400).json({ status: 400, message: req.t('passwordTooShort') });
  }
  try {
    const hashedPassword = await hashPassword(password);
    const existingUser = await user.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ status: 400, message: req.t('emailAlreadyExists') });
    }
    let buyer = await role.findOne({ where: { roleName: 'buyer' } });
    if (!buyer) {
      buyer = await role.create({
        roleName: 'buyer',
      });
    }
    // const preferredLanguage = req.body.preferred_language || 'defaultLanguage';

    const newUser = await user.create({
      email,
      password: hashedPassword,
      confirmationCode,
      name,
      gender: 'defaultGender',
      phone: 'defaultPhone',
      preferred_language: 'en',
      preferred_currency: 'defaultCurrency',
      billingAddress: [],
      birthdate: '2020-02-03',
      roleId: 3,
    });

    const option = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: 'Account Confirmation',
      html: `<p>${HeaderComponent}<br> Dear ${newUser.name}, <br> <br>Click <a href="${process.env.CONFIRMATION_URL}${confirmationCode}">${'here'}</a> To Confirm Your Account.<br><br> ${FooterComponent}</p>`,
    };
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
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

    (async () => {
      try {
        const info = await sendEmail(option);
        console.log(`Email sent: ${email}`);
        res.json({ status: 200, message: req.t('confirmEmailSent') });
      } catch (error) {
        console.error(error);

        res.json({
          status: 500,
          message: req.t('failedToSendConfirmationEmail'),
        });
      }
    })();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, message: req.t('failedToCreateUser') });
  }
};
export default { signUp };
