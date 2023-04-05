import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import i18nextMiddleware from 'i18next-http-middleware';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
<<<<<<< HEAD
import cookieParser from 'cookie-parser';
import userRouter from './routes/userrouters';
import { sequelize } from './database/models';
=======
import bodyParser from 'body-parser';
>>>>>>> b0a7e53 (feat(vendor): register vendor functionalities)
import router from './routes/routes';
import profileRouter from './routes/profileRouter';
import options from './docs/apidoc';
<<<<<<< HEAD
import signupRouter from './routes/user/userRoutes';
import googleAuth from './routes/user/googleAuthRoutes';
import facebookAuth from './routes/user/facebookAuthRoutes';
=======
import { vendors } from './database/models';

<<<<<<< HEAD
//const { Vendors } = require('./database/models');
>>>>>>> b0a7e53 (feat(vendor): register vendor functionalities)
=======
// const { Vendors } = require('./database/models');
>>>>>>> 02830ce (fixed update endpoint)

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
<<<<<<< HEAD
<<<<<<< HEAD
=======
app.use(express.urlencoded({extended: false}));
>>>>>>> b0a7e53 (feat(vendor): register vendor functionalities)
=======
app.use(express.urlencoded({ extended: false }));
>>>>>>> 02830ce (fixed update endpoint)
app.use(i18nextMiddleware.handle(i18next));
app.use(bodyParser.json());
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

<<<<<<< HEAD
app.use(userRouter);
app.use('/profile', profileRouter);
app.use(router);

app.listen(port, async () => {
  console.log(process.env.CLIENT_ID, process.env.FACEBOOK_APP_ID);
  console.log(`app listening on port ${port}`, process.env.NODE_ENV);
  await sequelize.authenticate();
  console.log('Database Connected!');
});

=======
app.get('/vendors', async (req, res) => {
  try {
    const vendor = await vendors.findAll();
    res.status(200).json(vendor);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
});

app.post('/vendors', async (req, res) => {
  try {
    const vendor = await vendors.create(req.body);
    res.status(201).json(vendor);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
});

app.get('/vendors/:id', async (req, res) => {
  try {
    const vendor = await vendors.findByPk(req.params.id);
    res.status(200).json(vendor);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
});

app.put('/vendors/:id', async (req, res) => {
  try {
    const vendor = await vendors.findByPk(req.params.id);
    await vendor.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(vendor);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
});
app.delete('/vendors/:id', async (req, res) => {
  try {
    const vendor = await vendors.findByPk(req.params.id);
    await vendors.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(vendor);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
});

app.use(router);
app.listen(port, () => console.log(`app listening on port ${port}`, process.env.NODE_ENV));
>>>>>>> b0a7e53 (feat(vendor): register vendor functionalities)
export default app;
