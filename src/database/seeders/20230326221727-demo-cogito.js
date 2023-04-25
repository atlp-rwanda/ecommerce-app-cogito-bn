/* eslint-disable indent */

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
<<<<<<< HEAD
          name: 'Nelly Kawera',
          email: 'kaweranelly123@example.com',
          gender: 'female',
          phone: '0788719499',
=======
          name: 'Leo Messi',
          email: 'leo@example.com',
          gender: 'male',
>>>>>>> a19c208b605911a333aada41c302172a3b77748b
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
          email: 'john@example.com',
          gender: 'male',
          phone: '0788719480',
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
<<<<<<< HEAD
          name: 'Ange',
          email: 'ange789@example.com',
          gender: 'female',
          phone: '0788719490',
=======
          name: 'Agnes Kunda',
          email: 'kundaaggy@example.com',
          gender: 'Female',
>>>>>>> a19c208b605911a333aada41c302172a3b77748b
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
          description: 'MacBook Pro',
          category_id: '1',
          vendor_id: '1',
          image: 'image.png',
          price: '600$',
          quantity: '100',
          stock: 'In Stock',
          carts_id: 1,
          orders_id: 2,
          wishlists_id: 2,
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
          seller_id: 1,
          user_id: 2,
          product_id: 3,
          description: 'MacBook Pro',
          image: 'image.png',
          price: '600$',
          quantity: '100',
          totalPrice: '60000$',
          stock: 'In Stock',
          Expire_Date: '2035-03-27 ',
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

    await queryInterface.bulkInsert(
      'RolePermissions',
      [
        {
          roleId: 1,
          permissionId: 1,
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
