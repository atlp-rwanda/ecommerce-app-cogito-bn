/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('coupons', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      coupon_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      discount_type: {
        type: Sequelize.ENUM('Percentage', 'Flat discount'),
        allowNull: false,
      },
      discount_amount: {
        type: Sequelize.DOUBLE,
        defaultValue: 0,
      },
      discount_percentage: {
        type: Sequelize.DOUBLE,
        defaultValue: 0,
      },
      minimum_purchase_amount: {
        type: Sequelize.INTEGER,
      },
      vendor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      associated_products: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: false,
      },
      start_date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      end_date: {
        type: Sequelize.DATE,
      },
      usage_limit: {
        type: Sequelize.INTEGER,
      },
      usage_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
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
    await queryInterface.dropTable('coupons');
  },
};
