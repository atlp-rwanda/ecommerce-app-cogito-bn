const generateRandomPrice = require('../../utils/randomPrice');

module.exports = {
  async up(queryInterface) {
    const Products = [
      {
        name: 'Laptop',
        description: 'A powerful and portable laptop for productivity and entertainment.',
      },
      {
        name: 'Smartphone',
        description: 'An advanced smartphone with a stunning display and powerful camera.',
      },
      { name: 'tablet', description: 'A sleek and modern tablet with a high-resolution display.' },
      {
        name: 'Smartwatch',
        description:
          'A sleek and feature-packed smartwatch for tracking fitness and notifications.',
      },
      {
        name: 'Headphones',
        description: 'Premium headphones with immersive sound and comfortable fit.',
      },
      {
        name: 'TV',
        description:
          'A large-screen TV with stunning picture quality for an immersive viewing experience.',
      },
      {
        name: 'Gaming Console',
        description: 'A gaming console with powerful performance and a wide selection of games.',
      },
      {
        name: 'Camera',
        description: 'A professional-grade camera with high-resolution image capture.',
      },
      {
        name: 'Drone',
        description: 'A compact and agile drone for aerial photography and videography.',
      },
      {
        name: 'Printer',
        description:
          'A versatile printer for home or office use with fast and high-quality printing.',
      },
      {
        name: 'External Hard Drive',
        description:
          'A portable external hard drive with large storage capacity for backups and file storage.',
      },
      {
        name: 'Wireless Router',
        description: 'A high-speed wireless router for reliable and fast internet connectivity.',
      },
      { name: 'Monitor', description: 'A high-resolution monitor for crisp and clear visuals.' },
      {
        name: 'Keyboard',
        description: 'A mechanical keyboard with customizable RGB lighting and responsive keys.',
      },
      {
        name: 'Mouse',
        description: 'An ergonomic mouse with adjustable DPI and programmable buttons.',
      },
      {
        name: 'Speakers',
        description:
          'Powerful speakers for immersive audio experience during music or movie playback.',
      },
      {
        name: 'Webcam',
        description: 'A high-definition webcam for video conferencing and live streaming.',
      },
      {
        name: 'Microphone',
        description:
          'A professional-grade microphone for crystal-clear audio recording and streaming.',
      },
      {
        name: 'Projector',
        description: 'A portable projector for big-screen entertainment and presentations.',
      },
      { name: 'Scanner', description: 'A high-speed scanner for digitizing documents and photos.' },
      {
        name: 'Smart Speaker',
        description:
          'A voice-controlled smart speaker with built-in virtual assistant for smart home control.',
      },
      {
        name: 'Fitness Tracker',
        description: 'A wearable fitness tracker for monitoring activity, heart rate, and sleep.',
      },
      {
        name: 'Smart Home Hub',
        description: 'A central control hub for managing smart home devices and automation.',
      },
      {
        name: 'E-Reader',
        description: 'A lightweight and portable e-reader for digital book reading.',
      },
      {
        name: 'Electric Toothbrush',
        description: 'An electric toothbrush for effective and thorough oral hygiene.',
      },
      {
        name: 'Hair Dryer',
        description: 'A powerful and efficient hair dryer for quick drying and styling.',
      },
      {
        name: 'Air Purifier',
        description: 'An air purifier for removing pollutants and improving indoor air quality.',
      },
      {
        name: 'Electric Shaver',
        description: 'An electric shaver for a smooth and comfortable shaving experience.',
      },
      {
        name: 'Bluetooth Speaker',
        description: 'A portable Bluetooth speaker for wireless music playback.',
      },
      {
        name: 'Portable Charger',
        description: 'A portable charger for charging devices on the go.',
      },
      {
        name: 'Smart Thermostat',
        description: 'A smart thermostat for convenient and energy-efficient temperature control.',
      },
      { name: 'Robot Vacuum', description: 'A robot vacuum for automated floor cleaning.' },
      {
        name: 'Instant Pot',
        description: 'A versatile multi-cooker for fast and convenient cooking.',
      },
      { name: 'Blender', description: 'A blender for making smoothies, sauces, and soups.' },
      { name: 'Coffee Maker', description: 'A coffee maker for brewing delicious coffee.' },
      { name: 'Juicer', description: 'A juicer for extracting juice from fruits and vegetables.' },
      { name: 'Toaster', description: 'A toaster for toasting bread and bagels.' },
      {
        name: 'Food Processor',
        description: 'A food processor for chopping, slicing, and shredding ingredients.',
      },
      { name: 'Stand Mixer', description: 'A stand mixer for effortless mixing and baking.' },
      {
        name: 'Slow Cooker',
        description: 'A slow cooker for preparing flavorful and tender meals.',
      },
      { name: 'Rice Cooker', description: 'A rice cooker for perfectly cooked rice.' },
      { name: 'Waffle Maker', description: 'A waffle maker for making crispy and fluffy waffles.' },
      {
        name: 'Air Fryer',
        description: 'An air fryer for healthy and crispy fried food with less oil.',
      },
      {
        name: 'Microwave Oven',
        description: 'A microwave oven for quick and convenient cooking and reheating.',
      },
      { name: 'Dishwasher', description: 'A dishwasher for efficient and convenient dishwashing.' },
      {
        name: 'Refrigerator',
        description: 'A refrigerator for storing and cooling food and beverages.',
      },
      { name: 'Washing Machine', description: 'A washing machine for laundry washing.' },
      { name: 'Dryer', description: 'A dryer for drying clothes quickly and efficiently.' },
      { name: 'Water Filter', description: 'A water filter for purifying and filtering water.' },
      {
        name: 'Vacuum Cleaner',
        description: 'A vacuum cleaner for efficient cleaning of floors and surfaces.',
      },
      { name: 'Sewing Machine', description: 'A sewing machine for sewing and stitching fabrics.' },
    ];
    const imageUrls = [
      'https://images.pexels.com/photos/40185/mac-freelancer-macintosh-macbook-40185.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/8533269/pexels-photo-8533269.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/205926/pexels-photo-205926.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1444416/pexels-photo-1444416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3945659/pexels-photo-3945659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/744366/pexels-photo-744366.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://i.dell.com/is/image/DellContent/content/dam/ss2/page-specific/category-pages/prod-2354-printer-epson-wf-c4810-lf-800x620.png?fmt=png-alpha&wid=800&hei=620',
      'https://images.unsplash.com/photo-1575729853562-e3ad7084c28d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      'https://images.pexels.com/photos/4218546/pexels-photo-4218546.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/205316/pexels-photo-205316.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1772123/pexels-photo-1772123.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://static.vecteezy.com/system/resources/thumbnails/023/140/923/small/gaming-mouse-rgb-on-black-background-generative-ai-photo.jpeg',
      'https://images.pexels.com/photos/5310538/pexels-photo-5310538.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/7172701/pexels-photo-7172701.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2097428/pexels-photo-2097428.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://www.viewsonic.com/vsAssetFile/me/img/resize/projector/scaled/PA500_L01%281%29_m_w640.webp',
      'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      'https://images.immediate.co.uk/production/volatile/sites/3/2020/09/What-is-a-smart-speaker-10f8e28.png',
      'https://images.unsplash.com/photo-1557935728-e6d1eaabe558?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1746&q=80',
      'https://www.thespruce.com/thmb/7W3eC1zSwlQSgYrhrvEOtBwruJk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SPR-Home-best-smart-home-hubs-5271295-v1-b34ced76be47480daf88ec5b9d3660e3.jpg',
      'https://images.unsplash.com/photo-1532961130800-58bc2c157ce4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      'https://images.unsplash.com/photo-1559671216-bda69517c47f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80',
      'https://images.unsplash.com/photo-1522338140262-f46f5913618a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80',
      'https://images.unsplash.com/photo-1563623700465-1265fad258f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      'https://images.unsplash.com/photo-1599351431613-18ef1fdd27e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80',
      'https://images.unsplash.com/photo-1511842745775-b366af36db2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      'https://images.unsplash.com/photo-1594549181132-9045fed330ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
      'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      'https://images.unsplash.com/photo-1558317374-24793bc9f2fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      'https://images.unsplash.com/photo-1556911820-1238441ed1a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80',
      'https://images.unsplash.com/photo-1585515320310-259814833e62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
      'https://images.unsplash.com/photo-1608354580875-30bd4168b351?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
      'https://images.pexels.com/photos/6458027/pexels-photo-6458027.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/7936648/pexels-photo-7936648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.immediate.co.uk/production/volatile/sites/30/2023/05/Best-food-processors-1df40b8.jpg',
      'https://images.pexels.com/photos/6996340/pexels-photo-6996340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.unsplash.com/photo-1599182345361-9542815e73f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2xvdyUyMGNvb2tlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmljZSUyMGNvb2tlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
      'https://media.istockphoto.com/id/183827010/photo/electric-waffle-maker-with-hot-waffles.jpg?b=1&s=612x612&w=0&k=20&c=dsgSFe6VOErh-FFx4WuyHCSjdZYJjDmimMp9htO2U_I=',
      'https://images.pexels.com/photos/33320/flyer-air-sky.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://media.istockphoto.com/id/148166172/photo/microwave-oven.jpg?s=1024x1024&w=is&k=20&c=2zRk19QJrL_ds8EephuNgOt1w-TK8tVcNuI59UGaLEU=',
      'https://images.unsplash.com/photo-1620568400263-6f1cf95b9e30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      'https://images.pexels.com/photos/4112600/pexels-photo-4112600.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80',
      'https://images.unsplash.com/photo-1630699375277-f13701bcdc00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
      'https://images.unsplash.com/photo-1589986005992-68bc7aa343c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      'https://images.pexels.com/photos/6195275/pexels-photo-6195275.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load',
    ];
    const products = [];

    // Generate 100 unique products
    for (let i = 0; i < 50; i++) {
      const product = Products[i];
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
        category_id: 9,
        vendor_id: 2,
        image: imageUrls[i].split(','),
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
