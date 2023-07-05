import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express.Router;
const corsOptions = {
  origin: process.env.BN_BASE_URL,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

export default corsOptions;
