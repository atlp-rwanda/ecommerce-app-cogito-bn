'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('vendors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      businessName: {
        type: Sequelize.STRING,
      },
      businessAddress: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      businessPhoneNumber: {
        type: Sequelize.STRING,
      },
      businessEmail: {
        type: Sequelize.STRING,
      },
      businessWebsite: {
        type: Sequelize.STRING,
      },
      businessDescription: {
        type: Sequelize.STRING,
      },
      businessLogo: {
        type: Sequelize.STRING,
      },
      productCategories: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
      },
      paymentMethods: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
      },
      status: {
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

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('vendors');
  },
};
