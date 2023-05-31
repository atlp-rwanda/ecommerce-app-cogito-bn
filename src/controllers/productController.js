import { Sequelize } from 'sequelize';
import { product, productViews } from '../database/models';
import checkProductsExpiration from '../utils/checkProductExpiration';

export const getAllProducts = async (req, res) => {
  try {
    const RetrieveAllProducts = await product.findAll({
      where: {
        stock: 'In Stock',
      },
      Raw: true,
    });
    if (!RetrieveAllProducts) {
      return res.status(404).json({
        status: '404',
        message: req.t('Products not found'),
      });
    }
    const productsObjects = Object.values(RetrieveAllProducts);
    const productsNotExpired = checkProductsExpiration(productsObjects);
    if (productsNotExpired.length === 0) {
      return res
        .status(404)
        .json({ status: 404, message: `${req.t('findproductByID_404_msg')} ${req.params.id}` });
    }

    return res.status(200).json({
      status: '200',
      response: productsNotExpired,
    });
  } catch (err) {
    return res.status(500).json({
      status: '500',
      message: `${req.t('Error in Retrieving all products!!')} ${req.params.id}.`,
      Error: err.message,
    });
  }
};
// function to get product by ID.
export const findproductByID = async (req, res) => {
  try {
    const { authenticatedBuyer } = req;
    if (!authenticatedBuyer) {
      return res.status(403).json({
        status: 403,
        message: req.t('unauthorized_msg'),
      });
    }
    const products = await product.findOne({
      where: {
        id: req.params.id,
        quantity: Sequelize.literal('"quantity" > \'0\''),
        stock: 'In Stock',
      },
      // raw: true,
    });
    if (products === null) {
      return res
        .status(404)
        .json({ status: 404, message: `${req.t('findproductByID_404_msg')} ${req.params.id}` });
    }
    const productsObjects = Object.values(products);
    const productsNotExpired = checkProductsExpiration(productsObjects);
    if (productsNotExpired.length === 0) {
      return res
        .status(404)
        .json({ status: 404, message: `${req.t('findproductByID_404_msg')} ${req.params.id}` });
    }
    // req.products = products;
    // Saving the viewed products id and the id of the user who viewed it
    await productViews.create({
      productId: req.params.id,
      buyerId: authenticatedBuyer.id,
    });
    return res.status(200).json({
      status: 200,
      message: `${req.t('findproductByID_200_msg')} ${req.params.id} `,
      response: productsNotExpired,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: `${req.t('findproductByID_500_msg')} ${req.params.id}.`,
      Error: error.message,
    });
  }
};
