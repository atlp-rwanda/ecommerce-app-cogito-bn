import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import i18nextMiddleware from 'i18next-http-middleware';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import router from './routes/routes';
import options from './docs/apidoc';
import { vendors } from './database/models';

// const { Vendors } = require('./database/models');

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
app.use(express.urlencoded({ extended: false }));
app.use(i18nextMiddleware.handle(i18next));
app.use(bodyParser.json());
app.use(cors());

dotenv.config();
const port = process.env.PORT;
app.use(express.json());

const specs = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get('/', (req, res) => res.status(200).json({ status: 200, message: req.t('welcome_message') }));

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
export default app;
