/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface) {
    const productNames = [
      'Laptop',
      'Smartphone',
      'tablet',
      'Smartwatch',
      'Headphones',
      'TV',
      'Gaming Console',
      'Camera',
      'Drone',
      'Printer',
      'External Hard Drive',
      'Wireless Router',
      'Monitor',
      'Keyboard',
      'Mouse',
      'Speakers',
      'Webcam',
      'Microphone',
      'Projector',
      'Scanner',
      'Smart Speaker',
      'Fitness Tracker',
      'Smart Home Hub',
      'E-Reader',
      'Electric Toothbrush',
      'Hair Dryer',
      'Air Purifier',
      'Electric Shaver',
      'Bluetooth Speaker',
      'Portable Charger',
      'Smart Thermostat',
      'Robot Vacuum',
      'Instant Pot',
      'Blender',
      'Coffee Maker',
      'Juicer',
      'Toaster',
      'Food Processor',
      'Stand Mixer',
      'Slow Cooker',
      'Rice Cooker',
      'Waffle Maker',
      'Air Fryer',
      'Microwave Oven',
      'Dishwasher',
      'Refrigerator',
      'Washing Machine',
      'Dryer',
      'Water Filter',
      'Vacuum Cleaner',
      'Sewing Machine',
    ];

    const products = [];

    // Generate 100 unique products
    for (let i = 0; i < 50; i++) {
      const productName = productNames[i];

      // Check if the product name already exists
      const existingProduct = products.find((product) => product.name === productName);

      // If the product name already exists, generate a new name
      if (existingProduct) {
        i--;
        continue;
      }

      // Add the new product to the array
      products.push({
        name: productName,
        description: 'Lorem ipsum dolor sit amet',
        category_id: (i % 5) + 1,
        vendor_id: (i % 5) + 1,
        image: [
          'https://res.cloudinary.com/dvdmnpf99/image/upload/v1683400177/dbouimuxxvdbquzc9ptr.jpg',
        ],
        price: 500,
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