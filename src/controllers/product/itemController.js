import { product } from "../../database/models";

const getAllItems = async (req, res) => {
  const { page = 1, page_size = 20 } = req.query;

  try {
    const items = await product.findAndCountAll({
      limit: page_size,
      offset: (page - 1) * page_size,
    });
    if (items.count === 0) {
      return res
        .status(200)
 
  .json({ message: req.t( "items_success_message"), items: [], seller_info: {} });
    }
    return res.status(200).json({ message:req.t ("items_success_message"), items: items.rows });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: req.t("items_error_message") });
  }
};

const getAllItemsBuyer = async (req, res, next) => {
  try {
    // Find all products that are available
    const availableProducts = await product.findAll({
      where: { stock: "In Stock" },
    });

    // Return the list of products as a JSON array
    return res.json({
      status: 200,
      message:req.t ("items_success_message"),
      items: availableProducts,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: 500, error:req.t ("items_error_message") });
  }
};

export default { getAllItems, getAllItemsBuyer };
