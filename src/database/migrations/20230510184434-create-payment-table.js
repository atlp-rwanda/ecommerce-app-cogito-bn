/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payment', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      amount: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      order_id: {
        allowNull: false,
        type: Sequelize.UUID,
        reference: {
          model: 'order',
          key: 'id',
        },
      },
      method: {
        type: Sequelize.STRING,
      },
      discount: {
        type: Sequelize.DOUBLE,
        defaultValue: 0,
      },
      stripeId: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('payment');
  },
};
