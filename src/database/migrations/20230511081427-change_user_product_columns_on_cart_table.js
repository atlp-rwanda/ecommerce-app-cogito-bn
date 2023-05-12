'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('carts', 'user_id');
    await queryInterface.removeColumn('carts', 'product_id');
    await queryInterface.addColumn('carts', 'user_id', {
      type: Sequelize.INTEGER,
      after: 'id',
      allowNull:false,
      references: {
        model:'users',
        key: 'id',
      }
    });
    await queryInterface.addColumn('carts', 'product_id', {
      type: Sequelize.INTEGER,
      after: 'id',
      allowNull:false,
      references: {
        model:'products',
        key: 'id',
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('carts', 'user_id');
    await queryInterface.removeColumn('carts', 'product_id');
  }
};
