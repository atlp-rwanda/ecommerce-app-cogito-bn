import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import i18nextMiddleware from 'i18next-http-middleware';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userrouters';
<<<<<<< HEAD
import { sequelize } from './database/models';
import router from './routes/routes';
import roleRoute from './routes/roleRoute';
import permissionRoute from './routes/permissionRoute';
import profileRouter from './routes/profileRouter';
import options from './docs/apidoc';
import signupRouter from './routes/user/userRoutes';
import googleAuth from './routes/user/googleAuthRoutes';
import facebookAuth from './routes/user/facebookAuthRoutes';
import searchParams from './routes/productSearch';

i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    backend: {
      loadPath: './src/locales/{{lng}}/{{ns}}.json',
    },
    fallbackLng: 'en',
    preload: ['en', 'fr'],
  });
const app = express();
app.use(i18nextMiddleware.handle(i18next));
app.use(cors());
app.use(cookieParser());

dotenv.config();
const port = process.env.PORT;

app.use(express.json());
const specs = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/user', signupRouter);
app.use(googleAuth);
app.use(facebookAuth);

app.get('/', (req, res) => res.status(200).json({ status: 200, message: req.t('welcome_message') }));

app.use(userRouter);
app.use('/profile', profileRouter);
app.use(router);
<<<<<<< HEAD
app.use(searchParams);
=======
app.use('/', roleRoute);
app.use('/', permissionRoute);
>>>>>>> a19c208b605911a333aada41c302172a3b77748b

app.listen(port, async () => {
  console.log('Database Connected!');
  console.log(`app listening on port ${port}`, process.env.NODE_ENV);
});

export default app;
