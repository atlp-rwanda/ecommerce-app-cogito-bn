import dotenv from 'dotenv';
import { Op } from 'sequelize';
import { product, productViews, user } from '../../database/models';

dotenv.config();

// all products endpoint are to be acccessed by only admin users.
// function to get all products registered in cogito ecommerce.
export const getAllproducts = async (req, res) => {
  try {
    const { authenticatedBuyer } = req;
    if (!authenticatedBuyer) {
      return res.status(403).json({
        status: 403,
        message: req.t('unauthorized_msg'),
      });
    }
    const products = await product.findAll();
    return res.status(200).json({
      status: 200,
      message: req.t('getAllproducts_200_msg'),
      response: products,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: req.t('getAllproducts_500_msg'),
      Error: error.message,
    });
  }
};
export const registerProduct = async (req, res) => {
  try {
    const { authenticatedUser } = req;
    if (!authenticatedUser) {
      return res.status(403).json({
        status: 403,
        message: req.t('unauthorized_msg'),
      });
    }
    const productCheck = await product.findOne({
      where: {
        name: req.body.name,
      },
    });
    if (productCheck) {
      return res
        .status(409)
        .json({ status: 409, message: req.t('registerProduct_409_msg') });
    }
    const newProduct = await product.create(req.body);
    return res.status(201).json({
      status: 201,
      message: req.t('registerProduct_201_msg'),
      response: newProduct,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: 500, message: req.t('registerProduct_500_msg'), Error: error });
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
    const products = await product.findByPk(req.params.id);
    if (products === null) {
      return res
        .status(404)
        .json({ status: 404, message: `${req.t('findproductByID_404_msg')} ${req.params.id}` });
    }
    // Saving the viewed products id and the id of the user who viewed it
    await productViews.create({
      productId: req.params.id,
      buyerId: authenticatedBuyer.id,
    });
    return res.status(200).json({
      status: 200,
      message: `${req.t('findproductByID_200_msg')} ${req.params.id} `,
      response: products,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: `${req.t('findproductByID_500_msg')} ${req.params.id}.`,
      Error: error.message,
    });
  }
};
// function to update product information.
export const updateproduct = async (req, res) => {
  try {
    const { authenticatedUser } = req;
    if (!authenticatedUser) {
      return res.status(403).json({
        status: 403,
        message: req.t('unauthorized_msg'),
      });
    }
    const products = await product.findByPk(req.params.id);

    await product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (products === null) {
      return res
        .status(404)
        .json({ status: 404, message: `${req.t('updateproduct_404_msg')}` });
    }
    return res.status(200).json({
      status: 200,
      message: `${req.t('updateproduct_200_msg')}`,
      response: products,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: `${req.t('updateproduct_500_msg')}`,
      Error: error.message,
    });
  }
};
// function to delete product by their ID.
export const deleteproduct = async (req, res) => {
  try {
    const { authenticatedUser } = req;
    if (!authenticatedUser) {
      return res.status(403).json({
        status: 403,
        message: req.t('unauthorized_msg'),
      });
    }
    const products = await product.findByPk(req.params.id);
    await product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (products === null) {
      return res.status(404).json({ status: 404, message: req.t('deleteproduct_404_msg') });
    }
    return res.status(200).json({
      status: 200,
      message: `${req.t('deleteproduct_200_msg')}`,
      response: products,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: `${req.t('deleteproduct_500_msg')} ${req.params.id}`,
      Error: error.message,
    });
  }
};

async function getRecommendedProducts(userID) {
  try {
    // Get the list of products that the buyer has viewed
    const viewedProducts = await productViews.findAll({
      where: {
        buyerId: userID,
      },
      attributes: ['productId'],
      raw: true,
    });
    const viewedProductIds = viewedProducts.map((viewedProduct) => viewedProduct.productId);
    // Find other buyers who have viewed the same products
    const similarBuyers = await productViews.findAll({
      where: {
        productId: viewedProductIds,
        buyerId: { [Op.not]: userID },
      },
      attributes: ['buyerId'],
      group: ['buyerId'],
      raw: true,
    });
    const similarBuyerIds = similarBuyers.map((similarBuyer) => similarBuyer.buyerId);
    // Find the products that these similar buyers have viewed
    const recommendedProducts = await productViews.findAll({
      where: {
        buyerId: similarBuyerIds,
        productId: { [Op.notIn]: viewedProductIds },
      },
      attributes: ['productId'],
      group: ['productId'],
      raw: true,
    });
    const recommendedProductIds = recommendedProducts.map(
      (recommendedProduct) => recommendedProduct.productId,
    );
    // Get the details of the recommended products
    const finalRecommendedProducts = await product.findAll({
      where: { id: recommendedProductIds },
      raw: true,
    });
    return finalRecommendedProducts;
  } catch (error) {
    console.log(error);
    return error;
  }
}
// function to get recommended product
export const RecommendedProduct = async (req, res) => {
  try {
    const { authenticatedBuyer } = req;
    if (!authenticatedBuyer) {
      return res.status(403).json({
        status: 403,
        message: req.t('unauthorized_msg'),
      });
    }
    const checkUserId = await user.findByPk(req.params.id);
    if (checkUserId === null) {
      return res
        .status(404)
        .json({ status: 404, message: `${req.t('getRecommendedProducts_404_msg')}` });
    }
    const buyerId = req.params.id;
    const recommendedProducts = await getRecommendedProducts(buyerId);
    const countNumber = recommendedProducts.length;
    return res.status(200).json({
      status: 200,
      message: `${req.t('getRecommendedProducts_200_msg')}`,
      count: `Number of Recommended Products: ${countNumber}`,
      response: recommendedProducts,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: `${req.t('getRecommendedProducts_500_msg')}`,
      Error: error.message,
    });
  }
};
