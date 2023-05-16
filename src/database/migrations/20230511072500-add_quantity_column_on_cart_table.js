/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('carts', 'quantity', {
      type: Sequelize.INTEGER,
      defaultValue: 1,
      after: 'product_id',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('carts', 'quantity');
  },
};
