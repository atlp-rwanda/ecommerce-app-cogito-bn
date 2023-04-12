import { user } from "../../database/models";
import {role} from "../../database/models";
import { generateConfirmationCode } from "../../utils/validation/generateCode";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { hashPassword } from "../../utils/validation/hashedPassword";

dotenv.config();
const signUp = async (req, res) => {
  const { email, password } = req.body;
  const confirmationCode = generateConfirmationCode();
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ status: 400, message: req.t("invalidEmail") });
  }
  if (!password || password.length < 8) {
   
    return res.status(400).json({status:400,message:req.t("passwordTooShort")});
  }
  try {
    const hashedPassword = await hashPassword(password);
    const existingUser = await user.findOne({ where: { email } });

    if (existingUser) {
      return res
        .status(400)
        .json({ status: 400, message: req.t("emailAlreadyExists") });
    }
    let buyer = await role.findOne({where:{roleName:'buyer'}});
    if(!buyer){
      buyer = await role.create({
        roleName:'buyer',
      })
    }
    //const preferredLanguage = req.body.preferred_language || 'defaultLanguage';

    const newUser = await user.create({
      email,
      password: hashedPassword,
      confirmationCode,
      name: "defaultName",
      gender: "defaultGender",
      preferredLanguage: "en",
      preferredCurrency: "defaultCurrency",
      billingAddress: [],
      birthdate: '2020-02-03',
      roleId: 3,
    });
    
   
    //req.body['roleId'] = buyer.id;
    //req.body['password'] = hashedPassword

    const option = {
      from: process.env.EMAIL_ADDRESS_98,
      to: email,
      subject: "confirmAccount",
      html: `<p>${"clickLink"} <a href="http://localhost:9999/user/confirm/${confirmationCode}">${"here"}</a> ${"toConfirmAccount"}.</p>`,
    };
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_ADDRESS_98,
        pass: process.env.EMAIL_PASS,
      },
    });
    const sendEmail = (option) => {
      return new Promise((resolve, reject) => {
        transporter.sendMail(option, (error, info) => {
          if (error) {
            reject(error);
          } else {
            resolve(info);
          }
        });
      });
    };

    (async () => {
      try {
        const info = await sendEmail(option);
        console.log(`Email sent: ${email}`);
        res.json({ status: 200, message: req.t("confirmEmailSent") });
      } catch (error) {
        console.error(error);

        res.json({
          status: 500,
          message: req.t("failedToSendConfirmationEmail"),
        });
      }
    })();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: 500, message: req.t("failedToCreateUser") });
  }
};
export default { signUp };
