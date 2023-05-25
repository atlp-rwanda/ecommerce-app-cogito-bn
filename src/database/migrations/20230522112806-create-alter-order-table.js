module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('orders', 'deliveryDate', {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: Date.now(),
    });

    await queryInterface.changeColumn('orders', 'shippingStatus', {
      type: Sequelize.ENUM('processing', 'out for delivery', 'cancelled', 'refunded', 'on hold'),
      defaultValue: 'pending',
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('orders', 'deliveryDate');

    await queryInterface.changeColumn('orders', 'shippingStatus', {
      type: Sequelize.ENUM('pending', 'shipped', 'delivered'),
      defaultValue: 'pending',
      allowNull: false,
    });
  },
};
