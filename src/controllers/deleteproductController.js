import { product } from '../database/models';

const deleteItem = async (req, res) => {
  const { id } = req.params;
  const specificItem = await product.findOne({
    where: { id },
  });
  try {
    if (specificItem) {
      await product.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({
        statusCode: 200,
        message: req.t('product_delete_message'),
        data: specificItem,
      });
    } else {
      res.status(404).json({
        statusCode: 404,
        message: req.t('productid_unexist_message'),
      });
    }
  } catch (error) {
    res.status(400).json({ statusCode: 400, data: error });
  }
};

export default { deleteItem };
