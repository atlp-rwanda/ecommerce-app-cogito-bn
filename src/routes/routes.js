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
import productRoute from './deleteProductRoute';
import cartRoute from './cart/updatecartRoute';
import permissionRoute from './permissionRoute';
import profileRouter from './profileRouter';
import options from '../docs/apidoc';
import vendorRouter from './vendor/vendorsRoutes';
import signupRouter from './user/userRoutes';
import googleAuth from './user/googleAuthRoutes';
import facebookAuth from './user/facebookAuthRoutes';
import Route from './roleRoute';
import { createUser, loginUser, logoutUser } from '../controllers/userController';
import searchProducts from '../controllers/search/productController';
import usersRouter from './API/user';
import cartRouter from './cartRouter';
import newUserValidation from '../middleware/newUser.validation';
import productItem from './product/itemsRoutes';
import productRouter from './product/productsRoutes';
import wishListRouter from './wishListRouter';
import recommendedProduct from './recommendedProductRoute';
import productCartRoute from './productCartRoute';
import productUpdate from './updateProduct';
import couponRouter from './coupon/couponRouter';
import reviewRouter from './reviewRouter';
import payment from './product/paymentRoute';
import clearCartRouter from './product/cartRoutes';
import chatRouter from './chatRouter';
import orderNotify from './orderNotiRoute';
import orderRouter from './order/orderRouter';
import authRoutes from './API/SendResetEmail';
import passwordUpdate from './passwordUpdateRoute';
import passwordPromptt from '../middleware/passwordPrompt';
import buyerSignup from './user/userRoutes';
import categoryRouter from './categoryRouter';
import NotificationRouter from './notificationRouter';

const router = express.Router();
const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};
router.use(cors(corsOptions));
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
router.use(cookieParser());
router.use(express.json());

const specs = swaggerJSDoc(options);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
router.use('/user', signupRouter);
router.use('/auth', googleAuth);
router.use(facebookAuth);
router.get('/', (req, res) => res.status(200).json({ status: 200, message: req.t('welcome_message') }));
router.use(userRouter);
router.use('/profile', profileRouter);
router.use('/vendors', vendorRouter);
router.use(productRoute);
router.use(cartRoute);
router.use('/', Route);
router.use('/', permissionRoute);
router.post('/login', passwordPromptt.passwordPrompt, loginUser);
router.post('/register', newUserValidation);
router.post('/register', createUser);
router.post('/logout', logoutUser);
router.post('/register', newUserValidation, createUser);
router.use('/wishlist', wishListRouter);
router.use('/cart', cartRouter);
router.use('/search', searchProducts);
router.use('/Otp', usersRouter);
router.use('/products', productRouter);
router.use(productItem);
router.use('/users', usersRouter);
router.use('/auth', authRoutes);
router.use('/create', Route);
router.use('/products', productCartRoute);
router.use('/create', Route);
router.use('/products', recommendedProduct);
router.use('/review', reviewRouter);
router.use('/auth', authRoutes);
router.use(productItem);
router.use('/', productUpdate);
router.use(productItem);
router.use('/users', usersRouter);
router.use('/auth', authRoutes);
router.use('/', passwordUpdate);

router.use('/coupon', couponRouter);
router.use(clearCartRouter);
router.use('/checkout', payment);
router.use('/chat', chatRouter);
router.use('/order', orderRouter);
router.use('/category', categoryRouter);
router.use(orderNotify);
router.use(buyerSignup);
router.use(NotificationRouter);

export default router;
