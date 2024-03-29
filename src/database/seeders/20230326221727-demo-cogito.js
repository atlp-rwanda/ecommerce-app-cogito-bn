/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const today = new Date();
    const nextYear = new Date(today);
    nextYear.setYear(today.getFullYear() + 1);
    await queryInterface.bulkInsert(
      'roles',
      [
        {
          roleName: 'Admin',
          description: 'manages users',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleName: 'Vendor',
          description: 'manages products',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleName: 'User',
          description: 'buys products',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
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
        lastPasswordUpdate: '2023-04-10',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        gender: 'male',
        phone: '0788719892',
        birthdate: new Date(),
        preferred_language: 'en',
        preferred_currency: 'RF',
        billing_address: ['KN 12 St, Kigali, Rwanda', 'Nyarugenge', 'Kigali', 'Rwanda'],
        password: 'kunda123',
        roleId: 2,
        lastPasswordUpdate: '2023-05-10',
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
        lastPasswordUpdate: '2023-05-10',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Kunda Aggy',
        email: 'kundaaggy@gmail.com',
        gender: 'Female',
        phone: '0788719892',
        birthdate: new Date(),
        preferred_language: 'en',
        preferred_currency: 'RF',
        billing_address: ['KN 12 St, Kigali, Rwanda', 'Nyarugenge', 'Kigali', 'Rwanda'],
        password: 'kunda123',
        roleId: 3,
        lastPasswordUpdate: '2023-01-10',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert(
      'products',
      [
        {
          name: 'Tablet',
          description: 'A Brand New Tablet',
          category_id: 9,
          vendor_id: 1,
          image: ['https://images.unsplash.com/photo-1623126908029-58cb08a2b272?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fFRhYmxldHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60, https://images.unsplash.com/photo-1625864667534-aa5208d45a87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fFRhYmxldHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'],
          price: 500,
          quantity: 100,
          stock: 'In Stock',
          expiredAt: '2025-04-23',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'MacBook Pro',
          description: 'A Brand New MacBook Pro',
          category_id: 9,
          vendor_id: 2,
          image: ['https://images.unsplash.com/photo-1569770218135-bea267ed7e84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TWFjQm9vayUyMFByb3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'],
          price: 2000,
          quantity: 100,
          stock: 'In Stock',
          expiredAt: '2025-04-23',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Gaming Mouse',
          description: 'Great Gaming mouse for laptop',
          image: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsPNZolothYJR-uYScrGOHw-clnpNEdkjoOg&usqp=CAU'],
          price: 50,
          quantity: 100,
          stock: 'In Stock',
          category_id: 9,
          vendor_id: 2,
          expiredAt: '2025-04-23',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'HP Laptop',
          description: 'A Brand New HP Laptop, HP Envy 15-11Th Gen Intel Core I9/32Gb/1Tb Ssd/15.6 Inches 400 Nits,4K Amoled Touch, Tuv + Windows 11',
          price: 1000,
          image: ['https://m.media-amazon.com/images/I/81Jbuo0ZmLL.jpg'],
          quantity: 1000,
          stock: 'In Stock',
          category_id: 9,
          vendor_id: 2,
          expiredAt: '2025-04-23',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
    await queryInterface.bulkInsert(
      'carts',
      [
        {
          user_id: 3,
          product_id: 2,
          quantity: 50,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 3,
          product_id: 2,
          quantity: 20,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 3,
          product_id: 1,
          quantity: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 3,
          product_id: 2,
          quantity: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 3,
          product_id: 3,
          quantity: 1,
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
      'permissions',
      [
        {
          permissionName: 'Manages users',
          description: 'Admin can Manage users',
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
      'vendors',
      [
        {
          userId: 1,
          businessName: 'ITH',
          businessAddress: ['KN 48B ST'],
          businessPhoneNumber: '+250781346188',
          businessEmail: 'cogito.ecommerce@gmail.com',
          businessWebsite: 'https://www.ith.com',
          businessDescription:
            'We are the Number One Wholesale company of all IT related product in Rwanda',
          businessLogo: 'https://www.pexels.com/photo/photo-of-computers-near-windows-3747481/',
          productCategories: [2, 9],
          paymentMethods: [1, 2, 3],
          status: 'ACTIVE',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          businessName: 'ABC Electronics',
          businessAddress: ['Main Street'],
          businessPhoneNumber: '+250788888888',
          businessEmail: 'cogito.ecommerce@gmail.com',
          businessWebsite: 'https://www.abcelectronics.com',
          businessDescription: 'We offer a wide range of electronic products and accessories',
          businessLogo: 'https://www.example.com/logo.png',
          productCategories: [9],
          paymentMethods: [1, 3],
          status: 'ACTIVE',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          businessName: 'Fashion World',
          businessAddress: ['Fashion Avenue'],
          businessPhoneNumber: '+250777777777',
          businessEmail: 'cogito.ecommerce@gmail.com',
          businessWebsite: 'https://www.fashionworld.com',
          businessDescription: 'Your one-stop destination for the latest fashion trends',
          businessLogo: 'https://www.example.com/logo.png',
          productCategories: [1, 11],
          paymentMethods: [2, 3],
          status: 'ACTIVE',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          businessName: 'Home Decor',
          businessAddress: ['Decor Street'],
          businessPhoneNumber: '+250766666666',
          businessEmail: 'cogito.ecommerce@gmail.com',
          businessWebsite: 'https://www.homedecor.com',
          businessDescription: 'Transform your home with our exquisite decor items',
          businessLogo: 'https://www.example.com/logo.png',
          productCategories: [9, 8, 1, 6],
          paymentMethods: [1, 2],
          status: 'ACTIVE',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          businessName: 'Gourmet Delights',
          businessAddress: ['Food Street'],
          businessPhoneNumber: '+250755555555',
          businessEmail: 'cogito.ecommerce@gmail.com',
          businessWebsite: 'https://www.gourmetdelights.com',
          businessDescription: 'Indulge in the finest gourmet food and beverages',
          businessLogo: 'https://www.example.com/logo.png',
          productCategories: [3, 4, 5],
          paymentMethods: [2, 3],
          status: 'ACTIVE',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 6,
          businessName: 'Sports Haven',
          businessAddress: ['Sports Avenue'],
          businessPhoneNumber: '+250744444444',
          businessEmail: 'cogito.ecommerce@gmail.com',
          businessWebsite: 'https://www.sportshaven.com',
          businessDescription: 'Your ultimate destination for sports equipment and accessories',
          businessLogo: 'https://www.example.com/logo.png',
          productCategories: [9, 10, 11],
          paymentMethods: [1, 3],
          status: 'ACTIVE',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );

    await queryInterface.bulkInsert('coupons', [
      {
        coupon_code: 'cogito101',
        discount_type: 'Percentage',
        discount_percentage: 10,
        minimum_purchase_amount: 1,
        vendor_id: 2,
        associated_products: [2],
        start_date: new Date(),
        end_date: nextYear,
        usage_limit: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface) {
    // Add commands to revert seed here.
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('carts', null, {});
    await queryInterface.bulkDelete('products', null, {});
    await queryInterface.bulkDelete('wishlists', null, {});
    await queryInterface.bulkDelete('payments', null, {});
    await queryInterface.bulkDelete('orders', null, {});
    await queryInterface.bulkDelete('vendors', null, {});
    await queryInterface.bulkDelete('roles', null, {});
    await queryInterface.bulkDelete('permissions', null, {});
    await queryInterface.bulkDelete('userRoles', null, {});
    await queryInterface.bulkDelete('rolepermissions', null, {});
    await queryInterface.bulkDelete('coupons', null, {});
  },
};
