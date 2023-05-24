import { orders } from '../../database/models';
import { io } from '../../index';

export async function getOrderStatus(req, res) {
  const { id } = req.params;

  const order = await orders.findOne({ where: { order_id: id } });
  if (!order) {
    return res.status(404).json({ status: 404, message: req.t('order_not_found') });
  }
  return res.status(200).json({
    status: 200,
    message: req.t('get_order_status_successful'),
    data: order,
    orderStatus: order.dataValues.shippingStatus,
    deliveryDate: order.dataValues.deliveryDate,
  });
}

export async function updateOrderStatus(req, res) {
  const { id } = req.params;
  const { status, deliveryDate } = req.body;

  const updatedOrder = await orders.update(
    {
      shippingStatus: status,
      deliveryDate,
    },
    {
      where: {
        order_id: id,
      },
      returning: true,
    },
  );

  if (!updatedOrder) {
    return res.status(404).json({ status: 404, message: req.t('order_not_found') });
  }
  const updatedStatus = {
    status: updatedOrder[1][0].dataValues.shippingStatus,
    deliveryDate: updatedOrder[1][0].dataValues.deliveryDate,
  };

  io.emit('updated status', updatedStatus);

  return res.status(200).json({
    status: 200,
    message: req.t('order_update_successful'),
    data: updatedOrder,
    orderstatus: updatedOrder[1][0].dataValues.shippingStatus,
    deliveryDate: updatedOrder[1][0].dataValues.deliveryDate,
  });
}
