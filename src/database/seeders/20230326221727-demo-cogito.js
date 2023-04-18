/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Leo Messi',
        email: 'leo@example.com',
        gender: 'male',
        phone: '0788719400',
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
        phone: '0788719892',
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
        email: 'kundaaggy@example.com',
        gender: 'Female',
        phone: '0788719892',
        birthdate: new Date(),
        preferred_language: 'en',
        preferred_currency: 'RF',
        billing_address: ['KN 12 St, Kigali, Rwanda', 'Nyarugenge', 'Kigali', 'Rwanda'],
        password: 'kunda123',
        roleId: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

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
          name: 'tablet',
          description: 'electonic device',
          price: '8k',
          image: [
            'https://res.cloudinary.com/dvdmnpf99/image/upload/v1683400177/dbouimuxxvdbquzc9ptr.jpg',
          ],
          quantity: '1k',
          stock: 'In Stock',
          category_id: 1,
          vendor_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'laptop',
          description: 'electronic device',
          price: '8k',
          image: [
            'https://res.cloudinary.com/dvdmnpf99/image/upload/v1683400177/dbouimuxxvdbquzc9ptr.jpg',
          ],
          quantity: '1k',
          stock: 'In Stock',
          category_id: 1,
          vendor_id: 2,
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
          user_id: 2,
          product_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
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
          id: '1',
          fullName: 'NDAHAYO Bertin',
          email: 'ndahayosibertin17@gmail.com',
          password: 'NDABer123',
          phoneNumber: '+250786949188',
          businessName: 'ITH',
          businessAddress: 'KN 48B ST',
          businessPhoneNumber: '+250781346188',
          businessEmail: 'ith.querries@gmail.com',
          businessWebsite: 'https://www.ith.com',
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
          businessWebsite: 'https://www.ith.com',
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
          businessWebsite: 'https://www.ith.com',
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
    await queryInterface.bulkDelete('vendors', null, {});
    await queryInterface.bulkDelete('roles', null, {});
    await queryInterface.bulkDelete('permissions', null, {});
    await queryInterface.bulkDelete('userRoles', null, {});
    await queryInterface.bulkDelete('rolepermissions', null, {});
  },
};
