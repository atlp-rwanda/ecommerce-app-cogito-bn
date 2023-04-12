import express from 'express';
import searchProducts from '../controllers/search/productController';

const searchParams = express.Router();

searchParams
  .route('/search')
  .get(searchProducts, (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
    next();
  });

export default searchParams;
