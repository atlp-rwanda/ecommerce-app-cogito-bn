/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'lastPasswordUpdate', {
      type: Sequelize.STRING,
      defaultValue: new Date(),
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'lastPasswordUpdate');
  },
};
