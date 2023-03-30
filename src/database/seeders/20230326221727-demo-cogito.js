'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

  await queryInterface.bulkInsert('users', [{
      orders_id: 1,
      wishlists_id:1,
      carts_id:1,
      firstName: "Agnes",
      lastName: "Kunda",
      email: "kundaaggy@gmail.com",
      password: "kunda123",
      role: "admin",
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
        carts_id: 1,
        orders_id: 2,
        wishlists_id:2,
        createdAt: new Date(),
        updatedAt: new Date()
      }],
        {});
        await queryInterface.bulkInsert('wishlists', [{
          name: "Laptop",
          seller_id: 1,
          user_id: 2,
          product_id: 3,
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
            product_id: 4,
            createdAt: new Date(),
            updatedAt: new Date()
          }],
            {}); 
            await queryInterface.bulkInsert('orders', 
            [{
              user_id: 1,
              product_id:1,
              quantity: 50,
              status: "Picking on Site",
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
  await queryInterface.bulkDelete('orders', null, {});
     
  }
};