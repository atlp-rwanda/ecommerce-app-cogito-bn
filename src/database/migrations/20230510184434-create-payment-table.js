/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payments', {
      paymentId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      orderId: {
        allowNull: false,
        type: Sequelize.UUID,
        reference: {
          model: 'order',
          key: 'id',
        },
      },
      paymentMethod: {
        type: Sequelize.STRING,
      },
      stripeId: {
        type: Sequelize.STRING,
      },
      transactionId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('payments');
  },
};
