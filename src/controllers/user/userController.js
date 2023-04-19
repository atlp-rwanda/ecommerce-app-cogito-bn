import express from 'express';
import bcrypt from 'bcrypt';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import i18nextMiddleware from 'i18next-http-middleware';
import { user } from '../../database/models';
import { validateUserLogin } from '../../middleware/user/UserValidator';
import { usersignAccessToken } from '../../middleware/user/userJWT';

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(i18nextMiddleware.handle(i18next));
i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    backend: {
      loadPath: '././src/locales/{{lng}}/{{ns}}.json',
    },
    fallbackLng: 'en',
    preload: ['en', 'fr'],
  });
export const getAllUsers = async (req, res) => {
  try {
    const User = await user.findAll();
    res.status(200).json({
      success: true,
      message: req.t('getAllUsers_200_msg'),
      response: User,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: req.t('getAllUsers_500_msg'),
      Error: error.message,
    });
  }
};

export const UserLogin = async (req, res) => {
  const { email } = req.body;
  const { password } = req.body;
  try {
    const { error } = validateUserLogin(req.body);
    if (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        message: req.t('UserLogin_400_msg'),
        Error: error.details[0].message,
      });
    }
    const User = await user.findOne({ where: { email } });
    if (!User) {
      return res.status(401).json({ success: false, message: req.t('UserLogin_401_001_msg') });
    }
    const isMatch = await bcrypt.compare(password, User.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: req.t('UserLogin_401_002_msg') });
    }
    const UserLoginToken = await usersignAccessToken(User.id, User.firstName, User.role);
    res
      .cookie('token', UserLoginToken, { httpOnly: true, secure: true })
      .status(200)
      .json({
        success: true,
        message: `${User.firstName} ${req.t('UserLogin_200_msg')}`,
        token: UserLoginToken,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: req.t('UserLogin_500_msg'), Error: error });
  }
};

export const registerUsers = async (req, res) => {
  try {
    const userEmail = await user.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (userEmail) {
      return res.status(409).json({ success: false, message: req.t('registerUsers_409_msg') });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUsers = await user.create({
      orders_id: req.body.orders_id,
      wishlists_id: req.body.wishlists_id,
      carts_id: req.body.carts_id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
    });
    res.status(201).json({
      success: true,
      message: req.t('registerUsers_201_msg'),
      response: newUsers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: req.t('registerUsers_500_msg'), Error: error });
  }
};
