import express from 'express';
import dotenv from 'dotenv';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import i18nextMiddleware from 'i18next-http-middleware';
import { product } from '../../database/models';

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(i18nextMiddleware.handle(i18next));
i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    backend: {
      loadPath: '././src/locales/{{lng}}/{{ns}}.json',
    },
    fallbackLng: 'en',
    preload: ['en', 'fr'],
  });
app.use(express.urlencoded({ extended: false }));

// all products endpoint are to be acccessed by only admin users.
// function to get all products registered in cogito ecommerce.
export const getAllproducts = async (req, res) => {
  try {
    const products = await product.findAll();
    res.status(200).json({
      success: true,
      message: req.t('Successfully retrieved all the products from the database'),
      response: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: req.t('Error in retrieving products form the database'),
      Error: error.message,
    });
  }
};
export const registerProduct = async (req, res) => {
  try {
    const productCheck = await product.findOne({
      where: {
        name: req.body.name,
      },
    });
    if (productCheck) {
      return res.status(409).json({ success: false, message: req.t('Product was already registered') });
    }
    const newProduct = await product.create(req.body);
    res.status(201).json({
      success: true,
      message: req.t('Product Registerd Successfully'),
      response: newProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: req.t('Product Registration failed'), Error: error });
  }
};
// function to get product by ID.
export const findproductByID = async (req, res) => {
  try {
    const products = await product.findByPk(req.params.id);
    if (products === null) {
      res
        .status(404)
        .json({ success: false, message: `${req.t('Product Not Found')} ${req.params.id}` });
    }
    res.status(200).json({
      success: true,
      message: `${req.t('Product Was Found with ID: ')} ${req.params.id} `,
      response: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `${req.t('Error in finding a product')} ${req.params.id}.`,
      Error: error.message,
    });
  }
};
// function to update product information.
export const updateproduct = async (req, res) => {
  try {
    const products = await product.findByPk(req.params.id);

    await product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (products === null) {
      res
        .status(404)
        .json({ success: false, message: `${req.t('Product was not found ')} ${req.params.id} ` });
    }
    res.status(200).json({
      success: true,
      message: `${req.t('Updated product succesfully ')} ${req.params.id}`,
      response: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `${req.t('Update product Error')} ${req.params.id}`,
      Error: error.message,
    });
  }
};
// function to delete product by their ID.
export const deleteproduct = async (req, res) => {
  try {
    const products = await product.findByPk(req.params.id);
    await product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (products === null) {
      res.status(404).json({ success: false, message: req.t('Not Found!! ') });
    }
    res.status(200).json({
      success: true,
      message: `${req.t('Deleted Successfully! ')} ${req.params.id}`,
      response: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `${req.t('Delete product Error ')} ${req.params.id}`,
      Error: error.message,
    });
  }
};
