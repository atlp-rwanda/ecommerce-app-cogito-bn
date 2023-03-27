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
      await queryInterface.bulkInsert('products', [{
        name: "Laptop",
        description: "MacBook Pro",
        category_id: "1",
        vendor_id: "1",
        image: "image.png",
        price: "600$",
        quantity: "100",
        stock: "In Stock",
        createdAt: new Date(),
        updatedAt: new Date()
      }],
        {});
        await queryInterface.bulkInsert('wishlists', [{
          name: "Laptop",
          seller_id: "1",
          description: "MacBook Pro",
          image: "image.png",
          price: "600$",
          quantity: "100",
          totalPrice: "60000$",
          stock: "In Stock",
          Expire_Date: "2035-03-27 ",
          createdAt: new Date(),
          updatedAt: new Date()
        }],
          {}); 
          await queryInterface.bulkInsert('categories', [{
            name: "Laptop",
            createdAt: new Date(),
            updatedAt: new Date()
          }],
            {}); 
  },

  async down (queryInterface, Sequelize) {
    // Add commands to revert seed here.
   
  await queryInterface.bulkDelete('users', null, {});
  await queryInterface.bulkDelete('carts', null, {});
  await queryInterface.bulkDelete('products', null, {});
  await queryInterface.bulkDelete('wishlists', null, {});
  await queryInterface.bulkDelete('categories', null, {});
     
  }
};
