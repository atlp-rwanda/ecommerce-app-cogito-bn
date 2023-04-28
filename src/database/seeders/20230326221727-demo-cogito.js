/* eslint-disable indent */

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Leo Messi',
          email: 'leo124@example.com',
          gender: 'male',
          birthdate: new Date(),
          preferred_language: 'en',
          preferred_currency: 'RF',
          billing_address: ['KN 12 St, Kigali, Rwanda', 'Nyarugenge', 'Kigali', 'Rwanda'],
          password: 'kunda123',
          roleId: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Neymar Jr',
          email: 'john124@example.com',
          gender: 'male',
          birthdate: new Date(),
          preferred_language: 'en',
          preferred_currency: 'RF',
          billing_address: ['KN 12 St, Kigali, Rwanda', 'Nyarugenge', 'Kigali', 'Rwanda'],
          password: 'kunda123',
          roleId: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Agnes Kunda',
          email: 'kundaaggy234@example.com',
          gender: 'Female',
          birthdate: new Date(),
          preferred_language: 'en',
          preferred_currency: 'RF',
          billing_address: ['KN 12 St, Kigali, Rwanda', 'Nyarugenge', 'Kigali', 'Rwanda'],
          password: 'kunda123',
          roleId: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],

      {},
    );

    await queryInterface.bulkInsert(
      'carts',
      [
        {
          user_id: '1',
          product_id: '5',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
    await queryInterface.bulkInsert(
      'products',
      [
        {
          name: 'Laptop',
          vendor_id: 2,
          description: 'MacBook Pro',
          category_id: 1,
          image: ['image.png'],
          price: 600,
          quantity: 100,
          stock: 'In Stock',
          expiryDate: '2035-03-27',
          available: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
    await queryInterface.bulkInsert(
      'wishlists',
      [
        {
          name: 'Laptop',
          product_id: 3,
          description: 'MacBook Pro',
          image: 'image.png',
          price: '600$',
          quantity: '100',
          totalPrice: '60000$',
          stock: 'In Stock',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
    await queryInterface.bulkInsert(
      'categories',
      [
        {
          name: 'Laptop',
          product_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
    await queryInterface.bulkInsert(
      'categories',
      [
        {
          name: 'Laptop',
          product_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
    await queryInterface.bulkInsert(
      'orders',
      [
        {
          user_id: 1,
          product_id: 1,
          quantity: 50,
          status: 'Picking on Site',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],

      {},
    );
    await queryInterface.bulkInsert(
      'roles',
      [
        {
          roleName: 'Admin',
          description: 'Managing users',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],

      {},
    );
    await queryInterface.bulkInsert(
      'permissions',
      [
        {
          permName: 'manage roles',
          description: 'Assigning and removing roles to the user',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],

      {},
    );
    await queryInterface.bulkInsert(
      'userRoles',
      [
        {
          userId: 1,
          roleId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],

      {},
    );

    // await queryInterface.bulkInsert(
    //   'RolePermissions',
    //   [
    //     {
    //       roleId: 1,
    //       permissionId: 1,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     },
    //   ],

    //   {},
    // );

    // await queryInterface.bulkInsert(
    //   'orders',
    //   [
    //     {
    //       user_id: 1,
    //       product_id: 1,
    //       quantity: 50,
    //       status: 'Picking on Site',
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     },
    //   ],

    //   {},
    // );
  },

  async down(queryInterface) {
    // Add commands to revert seed here.

    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('carts', null, {});
    await queryInterface.bulkDelete('products', null, {});
    await queryInterface.bulkDelete('wishlists', null, {});
    await queryInterface.bulkDelete('categories', null, {});
    await queryInterface.bulkDelete('orders', null, {});
    await queryInterface.bulkDelete('roles', null, {});
    await queryInterface.bulkDelete('permissions', null, {});
    await queryInterface.bulkDelete('userRoles', null, {});
    await queryInterface.bulkDelete('RolePermissions', null, {});
  },
};
