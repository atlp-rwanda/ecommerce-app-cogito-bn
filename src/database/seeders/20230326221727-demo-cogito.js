'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

  await queryInterface.bulkInsert('users', [{
      firstName: "Agnes",
      lastName: "Kunda",
      email: "kundaaggy@gmail.com",
      password: "kunda123",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date()
    }],
    [{
      firstName: "user",
      lastName: "vendor",
      email: "user@gmail.com",
      password: "user123",
      role: "vendor",
      createdAt: new Date(),
      updatedAt: new Date()
    }],
      {});

      await queryInterface.bulkInsert('carts', [{
        user_id: "1",
        product_id: "5",
        createdAt: new Date(),
        updatedAt: new Date()
      }],
        {});
  },

  async down (queryInterface, Sequelize) {
    // Add commands to revert seed here.
   
  await queryInterface.bulkDelete('users', null, {});
  await queryInterface.bulkDelete('carts', null, {});
     
  }
};
