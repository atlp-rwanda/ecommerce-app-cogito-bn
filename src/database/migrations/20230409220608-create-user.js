/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      orders_id: {
        type: Sequelize.INTEGER,
      },
      wishlists_id: {
        type: Sequelize.INTEGER,
      },
      carts_id: {
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING,
      },
      confirmationCode: {
        type: Sequelize.INTEGER,
      },
      confirmed: {
        type: Sequelize.BOOLEAN,
      },

      token: {
        type: Sequelize.STRING,

        status: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: 'active',
        },

        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('User');
  },
};
