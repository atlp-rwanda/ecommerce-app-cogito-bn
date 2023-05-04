/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('orders', {
      order_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      buyerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      productId: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },
      shippingAddress: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },
      totalCost: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      paymentStatus: {
        type: Sequelize.ENUM('pending', 'paid', 'failed'),
        allowNull: false,
        defaultValue: 'pending',
      },
      shippingStatus: {
        type: Sequelize.ENUM('pending', 'shipped', 'delivered'),
        allowNull: false,
        defaultValue: 'pending',
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('orders');
  },
};
