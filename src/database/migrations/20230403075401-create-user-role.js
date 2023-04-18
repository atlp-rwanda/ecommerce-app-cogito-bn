<<<<<<< HEAD
=======
'use strict';
>>>>>>> 7da263e (feat(search)create a search endpoint)
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('userRoles', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      userId: {
<<<<<<< HEAD
        type: Sequelize.INTEGER,
=======
       type: Sequelize.INTEGER,
>>>>>>> 7da263e (feat(search)create a search endpoint)
        references: {
          model: 'users',
          key: 'id',
        },
      },
      roleId: {
<<<<<<< HEAD
        type: Sequelize.INTEGER,
=======
       type: Sequelize.INTEGER,
>>>>>>> 7da263e (feat(search)create a search endpoint)
        references: {
          model: 'roles',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
<<<<<<< HEAD
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
=======
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
>>>>>>> 7da263e (feat(search)create a search endpoint)
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('userRoles');
<<<<<<< HEAD
  },
};
=======
  }
};
>>>>>>> 7da263e (feat(search)create a search endpoint)
