import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './database/models';
import router from './routes/routes';

const app = express();
dotenv.config();
const port = process.env.PORT;
app.use(router);
app.listen(port, async () => {
  console.log(`app  on port ${port}`, process.env.NODE_ENV);
  await sequelize.authenticate();
  console.log('Database Connected!');
});
export default app;
