import { orders } from '../../database/models';

const getOrderDetails = async (order_id) => {
  try {
    // Retrieve the order details from the database
    const order = await orders.findOne({
      where: { order_id },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    // If no order was found, return null
    if (!order) {
      return null;
    }
    console.log(order);
    // Otherwise, return the order details
    return order.toJSON();
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching order details');
  }
};
export default getOrderDetails;
