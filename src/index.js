import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import i18nextMiddleware from 'i18next-http-middleware';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { sequelize } from './database/models';
import router from './routes/routes';
import profileRouter from './routes/profileRouter';
import options from './docs/apidoc';
import vendorRouter from './routes/vendor/vendorsRoutes';
import userRouter from './routes/user/userRoutes';
import signupRouter from "./routes/user/userRoutes";
import googleAuth from "./routes/user/googleAuthRoutes";
import facebookAuth from "./routes/user/facebookAuthRoutes"

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

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(i18nextMiddleware.handle(i18next));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

dotenv.config();
const port = process.env.PORT;

app.use(express.json());

const specs = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use("/user", signupRouter)
app.use(googleAuth)
app.use(facebookAuth)

app.get('/', (req, res) => res.status(200).json({ status: 200, message: req.t('welcome_message') }));
app.use('/profile', profileRouter);
app.use(router);
app.use('/vendors', vendorRouter);
app.use('/users', userRouter);
app.listen(port, async () => {
  console.log(`app listening on port ${port}`, process.env.NODE_ENV);
  await sequelize.authenticate();
  console.log('Database Connected!');
});
export default app;
