import db from '../../database/models';

export default async function updateOrderStatus(order_id, paymentStatus) {
  const updatedOrder = await db.orders.findOne({
    where: { order_id },
  });
  if (!updatedOrder) {
    throw new Error('Order not found');
  }
  updatedOrder.paymentStatus = paymentStatus;
  await updatedOrder.save();
  return updatedOrder;
}
