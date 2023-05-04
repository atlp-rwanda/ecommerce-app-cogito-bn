/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('orders', [
      {
        order_id: 'd7311dc2-03e2-4d54-b1e1-9b21c01303a8',
        buyerId: 3,
        productId:["1", "2"],
        shippingAddress: ['123 Main St', 'Apt 4B', 'New York, NY 10001'],
        totalCost: 5000,
        paymentStatus: 'pending',
        shippingStatus: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        order_id: 'ab9ef26b-27bf-4878-b0bb-049e84e2a1f1',
        buyerId: 2,
        productId: ["9", "90"],
        shippingAddress: ['456 Oak St', 'Suite 200', 'San Francisco, CA 94107'],
        totalCost: 3000,
        paymentStatus: 'paid',
        shippingStatus: 'shipped',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('orders', null, {});
  },
};
