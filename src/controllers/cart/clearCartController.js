import { cart } from "../../database/models";

const clearCart = async (req, res) => {
  try {
  
    const buyerId = req.body.userId  

    if (!buyerId) {
      return res.json({
        status: 400,
        error: req.t("buyer_id_missing"),
      });
    }
   

    const cartItems = await cart.destroy({
      where: {
        user_id: buyerId,
      },
    });
    const totalPrice = await cart.findAll({
      where: {
        user_id: buyerId,
      },
    });

    if (cartItems === 0) {
      return res.json({
        status: 200,
        message: req.t("cart_empty"),
      });
    }

    return res.json({
      status: 200,
      message: req.t("clear_cart_successfuly"),
      data: { totalAmount: totalPrice.length },
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: 500,
      error: req.t("server_error_message"),
    });
  }
};

export default { clearCart };