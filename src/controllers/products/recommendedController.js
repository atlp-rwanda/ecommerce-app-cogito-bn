import dotenv from 'dotenv';
import { Op } from 'sequelize';
import {
  product, productViews, user, wishlist,
} from '../../database/models';
import removeDuplicates from '../../utils/products/handlingRemoveProducts';

dotenv.config();

// all products endpoint are to be acccessed by only admin users.
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
async function getRecommendedProducts(userID) {
  try {
    // Get the list of all products from the wishlist of the buyer
    const wishlistProducts = await wishlist.findAll({
      where: {
        user_id: userID,
      },
      attributes: ['product_id'],
      raw: true,
    });
    const wishedProductsIds = wishlistProducts.map((wishedProduct) => wishedProduct.product_id);
    // Get the list of products that the buyer has viewed
    const viewedProducts = await productViews.findAll({
      where: {
        buyerId: userID,
      },
      attributes: ['productId'],
      raw: true,
    });
    const viewedProductIds = viewedProducts.map((viewedProduct) => viewedProduct.productId);
    // Combine both lists of product IDs and remove duplicates
    const allProducts = [...wishedProductsIds, ...viewedProductIds];
    const allProductIds = removeDuplicates(allProducts);
    // Returning the all products if the allProductsIds is null
    // For the user with no wishlist and product viewed product.
    if (allProductIds.length === 0) {
      const finalRecommendedProducts = await product.findAll({
        order: [['updatedAt', 'DESC']],
      });
      return finalRecommendedProducts;
    }
    // Getting all the categories of products from the buyer wishlist and product viewed
    const categories = await product.findAll({
      where: {
        id: allProductIds,
      },
      attributes: ['category_id'],
      raw: true,
    });
    const categoryIds = categories.map((category) => category.category_id);
    const categoryIdsNew = removeDuplicates(categoryIds);
    // Get products that are in the same category as the wishlist and the product viewed products.
    const productsInCategory = await product.findAll({
      where: {
        category_id: categoryIdsNew,
      },
      attributes: ['id'],
      raw: true,
    });
    const productsInCategoryIds = productsInCategory.map((cat) => cat.id);
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
    const similarProducts = await productViews.findAll({
      where: {
        buyerId: similarBuyerIds,
        productId: { [Op.notIn]: viewedProductIds },
      },
      attributes: ['productId'],
      group: ['productId'],
      raw: true,
    });
    const similarProductsId = similarProducts.map(
      (recommendedProduct) => recommendedProduct.productId,
    );
    const recommendedProduct = [
      ...wishedProductsIds,
      ...productsInCategoryIds,
      ...similarProductsId,
    ];
    const recommendedProductIds = removeDuplicates(recommendedProduct);
    // Get the details of the recommended products
    const finalRecommendedProducts = await product.findAll({
      where: { id: recommendedProductIds },
      order: [['updatedAt', 'DESC']],
      raw: true,
    });
    return finalRecommendedProducts;
  } catch (error) {
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
