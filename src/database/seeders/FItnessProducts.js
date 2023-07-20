const generateRandomPrice = require('../../utils/randomPrice');

module.exports = {
  async up(queryInterface) {
    const products = [];
    const fitnessProducts = [
      {
        name: 'Resistance Bands Set',
        description:
          'A set of elastic bands with different resistance levels for strength training and muscle toning.',
      },
      {
        name: 'Yoga Mat',
        description: 'A non-slip and cushioned mat for yoga, pilates, and other floor exercises.',
      },
      {
        name: 'Dumbbell Set',
        description:
          'A set of dumbbells with varying weights for strength training and building muscle.',
      },
      {
        name: 'Fitness Tracker',
        description:
          'A wearable device that tracks your daily activities, heart rate, and sleep patterns.',
      },
      {
        name: 'Exercise Ball',
        description:
          'A large inflatable ball used for stability exercises, core workouts, and balance training.',
      },
      {
        name: 'Jump Rope',
        description:
          'A lightweight and adjustable rope for cardio workouts and improving coordination.',
      },
      {
        name: 'Kettlebell',
        description: 'A cast-iron weight with a handle for dynamic strength training exercises.',
      },
      {
        name: 'Foam Roller',
        description:
          'A cylindrical foam roller used for self-massage and releasing muscle tension.',
      },
      {
        name: 'Adjustable Weight Bench',
        description:
          'A versatile weight bench that can be adjusted for various exercises and workout positions.',
      },
      {
        name: 'Resistance Loop Bands',
        description:
          'A set of mini bands with different resistance levels for glute activation and lower body workouts.',
      },
    ];
    const FitnessProductsimageUrls = [
      'https://www.dshop.com.au/assets/full/tp11.jpg?20210318034521',
      'https://www.turningpointe.ae/wp-content/uploads/2021/08/Yoga-Mat-multicolor72.jpg',
      'https://www.primalstrength.com/cdn/shop/products/Primal-Strength-Urethane-Dumbbells-1.jpg?v=1646479620',
      'https://m.media-amazon.com/images/I/516k4KKxUBL._AC_UF1000,1000_QL80_.jpg',
      'https://cdn.thewirecutter.com/wp-content/media/2023/02/exerciseballs-2048px-09602-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=1024',
      'https://m.media-amazon.com/images/I/61J65Fm47HL._AC_UF894,1000_QL80_.jpg',
      'https://www.hamptonfit.com/wp-content/uploads/2014/04/HKB-50-1.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFqfbttAHf355pJOlDg0EGRFbyr6sjWBc9dkDff2zWdXBhI0ZKiZ4jvO6TU2CtvhrAR-E&usqp=CAU',
      'https://www.primalstrength.com/cdn/shop/products/Primal-Strength-V3-Home-Bench.png?v=1646483928',
      'https://limmgroup.com/cdn/shop/products/main-v2.jpg?v=1619165092',
    ];
    for (let i = 0; i < fitnessProducts.length; i++) {
      const product = fitnessProducts[i];
      const productName = product.name;
      const productDescription = product.description;
      // Check if the product name already exists
      const existingProduct = products.find((pro) => pro.name === productName);

      // If the product name already exists, generate a new name
      if (existingProduct) {
        i--;
        continue;
      }

      // Add the new product to the array
      products.push({
        name: productName,
        description: productDescription,
        category_id: 10,
        vendor_id: 6,
        image: FitnessProductsimageUrls[i].split(','),
        price: generateRandomPrice(),
        quantity: 50,
        stock: 'In Stock',
        expiredAt: '2025-04-23',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert('products', products, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('products', null, {});
  },
};
