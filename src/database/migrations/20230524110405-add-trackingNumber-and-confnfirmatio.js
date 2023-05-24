/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('orders', 'Tracking', {
      type: Sequelize.STRING,
      after: 'shippingStatus',
      allowNull: true,
    });
    await queryInterface.addColumn('orders', 'Confirmation', {
      type: Sequelize.BOOLEAN,
      after: 'shippingStatus',
      defaultValue: false,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
