/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('vendors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fullName: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      phoneNumber: {
        type: Sequelize.STRING,
      },
      businessName: {
        type: Sequelize.STRING,
      },
      businessAddress: {
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
      },
      paymentMethods: {
        type: Sequelize.STRING,
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('vendors');
  },
};
