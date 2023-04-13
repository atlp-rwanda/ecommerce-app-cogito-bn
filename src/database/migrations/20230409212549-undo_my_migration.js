module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'confirmationCode');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'confirmationCode', {
      type: Sequelize.STRING,
      allowNull: true
    });
  }
};
