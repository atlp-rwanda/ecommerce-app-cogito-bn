/* eslint-disable indent */

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Admin Messi',
        email: 'leo@example.com',
        gender: 'male',
        phone: '0788719400',
        birthdate: new Date(),
        preferred_language: 'en',
        preferred_currency: 'RF',
        billing_address: ['KN 12 St, Kigali, Rwanda', 'Nyarugenge', 'Kigali', 'Rwanda'],
        password: 'kunda123',
        roleId: 1,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Seller Neymar',
        email: 'john@example.com',
        gender: 'male',
        phone: '0788719892',
        birthdate: new Date(),
        preferred_language: 'en',
        preferred_currency: 'RF',
        billing_address: ['KN 12 St, Kigali, Rwanda', 'Nyarugenge', 'Kigali', 'Rwanda'],
        password: 'kunda123',
        roleId: 2,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Agnes Kunda',
        email: 'kundaaggy@example.com',
        gender: 'Female',
        phone: '0788719892',
        birthdate: new Date(),
        preferred_language: 'en',
        preferred_currency: 'RF',
        billing_address: ['KN 12 St, Kigali, Rwanda', 'Nyarugenge', 'Kigali', 'Rwanda'],
        password: 'kunda123',
        roleId: 3,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert(
      'carts',
      [
        {
          user_id: '1',
          product_id: '1',
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
        {
          name: 'Laptop',
          description: 'HP',
          category_id: '1',
          vendor_id: '1',
          image: 'image.png',
          price: '400$',
          quantity: '50',
          stock: 'In Stock',
          carts_id: 1,
          orders_id: 2,
          wishlists_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Laptop',
          description: 'Dell',
          category_id: '1',
          vendor_id: '1',
          image: 'image.png',
          price: '350$',
          quantity: '40',
          stock: 'In Stock',
          carts_id: 1,
          orders_id: 2,
          wishlists_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Laptop',
          description: 'TOSHIBA',
          category_id: '1',
          vendor_id: '1',
          image: 'image.png',
          price: '300$',
          quantity: '10',
          stock: 'In Stock',
          carts_id: 1,
          orders_id: 2,
          wishlists_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Telephone',
          description: 'IPHONE',
          category_id: '1',
          vendor_id: '1',
          image: 'image.png',
          price: '1000$',
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
      'vendors',
      [
        {
          id: '1',
          fullName: 'NDAHAYO Bertin',
          email: 'ndahayosibertin17@gmail.com',
          password: 'NDABer123',
          phoneNumber: '+250786949188',
          businessName: 'ITH',
          businessAddress: 'KN 48B ST',
          businessPhoneNumber: '+250781346188',
          businessEmail: 'ith.querries@gmail.com',
          businessWebsite: 'www.ith.com',
          businessDescription:
            'We are the Number One Wholesale company of all IT related product in Rwanda',
          businessLogo: 'https://www.pexels.com/photo/photo-of-computers-near-windows-3747481/',
          productCategories: 'Computers, Phones, Printers, Phones, Accessories',
          paymentMethods: 'MoMo, PayPal, VISA',
          status: 'ACTIVE',
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
          product_id: 2,
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
        {
          roleName: 'Seller',
          description: 'Managing Products',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleName: 'Buyer',
          description: 'Able to buy',
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
          permissionName: 'manage roles',
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
      'rolepermissions',
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
  },

  async down(queryInterface, Sequelize) {
    // Add commands to revert seed here.

    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('carts', null, {});
    await queryInterface.bulkDelete('products', null, {});
    await queryInterface.bulkDelete('wishlists', null, {});
    await queryInterface.bulkDelete('categories', null, {});
    await queryInterface.bulkDelete('orders', null, {});
    await queryInterface.bulkDelete('vendors', null, {});
    await queryInterface.bulkDelete('roles', null, {});
    await queryInterface.bulkDelete('permissions', null, {});
    await queryInterface.bulkDelete('userRoles', null, {});
    await queryInterface.bulkDelete('rolepermissions', null, {});
  },
};
