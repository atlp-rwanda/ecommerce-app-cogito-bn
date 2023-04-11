'use strict';

export default   {
up: async (queryInterface, Sequelize) => {
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
allowNull: false,
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
allowNull: false,
},
phone: {
type: Sequelize.STRING,
allowNull: false,
},
role: {
type: Sequelize.STRING,
allowNull: false,
},
token: {
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
await queryInterface.dropTable('User');
},
};

