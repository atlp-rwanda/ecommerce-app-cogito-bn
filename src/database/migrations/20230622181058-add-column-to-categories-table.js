/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('categories', 'product_id');

    await queryInterface.addColumn('categories', 'image', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('categories', 'image');

    await queryInterface.addColumn('categories', 'product_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
};
