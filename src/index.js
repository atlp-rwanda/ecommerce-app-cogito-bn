import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './database/models';
import router from './routes/routes';

const app = express();
dotenv.config();

const port = process.env.PORT;

app.use(router);
app.listen(port, async () => {
  await sequelize.authenticate();
  console.log('Database Connected!');
  console.log(`app listening on port ${port}`, process.env.NODE_ENV);
});
export default app;
