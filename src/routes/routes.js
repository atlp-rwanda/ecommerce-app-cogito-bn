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
import productRoute from './productRoute';
import signupRouter from './user/userRoutes';
import googleAuth from './user/googleAuthRoutes';
import facebookAuth from './user/facebookAuthRoutes';
import roleRoute from './roleRoute';
import { createUser, loginUser } from '../controllers/userController';
import usersRouter from './API/user';
import newUserValidation from '../middleware/newUser.validation';
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
router.use('/', roleRoute);
router.use('/', permissionRoute);
router.use('/', productRoute);
router.post('/register', newUserValidation, createUser);
router.post('/login', loginUser);
router.use('/users', usersRouter);
router.use('/OTP', usersRouter);

export default router;
