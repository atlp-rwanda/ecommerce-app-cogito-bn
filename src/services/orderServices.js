import orders from '../database/models/order';

async function getOrdersByUser(userId) {
  const Orders = await Order.findAll({ where: { userId } });
  return orders;
}

async function getOrderById(id) {
  const order = await orders.findOne({ where: { order_id: id } });
  console.log(order);
  return order;
}

async function updateOrderStatus(id, status) {
  const order = await Order.findOne({ where: { id } });
  order.status = status;
  order.statusUpdated = true;
  await order.save();
  return Order.findOne({ where: { id } });
}

async function paymentOrderStatus(status, id) {
  const data = await Order.update({ status }, { where: { id } });
  return data;
}

async function getOrders() {
  const data = await Order.findAll();
  return data;
}

export default {
  updateOrderStatus,
  getOrdersByUser,
  getOrderById,
  paymentOrderStatus,
  getOrders,
};
