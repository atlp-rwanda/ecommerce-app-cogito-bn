module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('carts', 'quantity', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
      after: 'product_id',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('carts', 'quantity');
  },
};