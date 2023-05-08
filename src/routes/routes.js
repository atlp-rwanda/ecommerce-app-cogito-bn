// This is where routers will be

// tip:
/**
 *
 * A route is a section of Express code that
 * associates an HTTP verb ( GET , POST , PUT , DELETE , etc.),
 * a URL path/pattern, and a function that is called to handle that pattern
 *
 */

import express from 'express';
import cors from 'cors';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import i18nextMiddleware from 'i18next-http-middleware';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import userRouter from './userrouters';
import permissionRoute from './permissionRoute';
import profileRouter from './profileRouter';
import options from '../docs/apidoc';
import vendorRouter from './vendor/vendorsRoutes';
import signupRouter from './user/userRoutes';
import googleAuth from './user/googleAuthRoutes';
import facebookAuth from './user/facebookAuthRoutes';
import Route from './roleRoute';
import roleRoute from './roleRoute';
import { createUser, loginUser, logoutUser } from '../controllers/userController';
import usersRouter from './API/user';
import newUserValidation from '../middleware/newUser.validation';
import wishListRouter from './wishListRouter';
import recommendedProduct from './recommendedProductRoute';

// Login route

// Create a new user route
const router = express.Router();
i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    backend: {
      loadPath: '././././././src/locales/{{lng}}/{{ns}}.json',
    },
    fallbackLng: 'en',
    preload: ['en', 'fr'],
  });
router.use(express.urlencoded({ extended: false }));
router.use(i18nextMiddleware.handle(i18next));
router.use(bodyParser.json());
router.use(cors());
router.use(cookieParser());
router.use(express.json());

const specs = swaggerJSDoc(options);

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
router.use('/user', signupRouter);
router.use(googleAuth);
router.use(facebookAuth);
router.get('/', (req, res) => res.status(200).json({ status: 200, message: req.t('welcome_message') }));
router.use(userRouter);
router.use('/profile', profileRouter);
router.use('/vendors', vendorRouter);
router.use(productRoute);
router.use('/', roleRoute);
router.use('/', Route);
router.use('/', permissionRoute);
router.post('/register', newUserValidation);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/register', createUser);
router.use('/wishlist', wishListRouter);
router.use('/OTP', usersRouter);
router.use('/create', Route);
router.use('/products', recommendedProduct);
router.post('/logout', logoutUser);

export default router;
