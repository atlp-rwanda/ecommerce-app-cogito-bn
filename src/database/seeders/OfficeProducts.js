const generateRandomPrice = require('../../utils/randomPrice');

module.exports = {
  async up(queryInterface) {
    const products = [];
    const officeSuppliesProducts = [
      {
        name: 'Ballpoint Pens',
        description:
          'A set of smooth-writing ballpoint pens with a comfortable grip, ideal for everyday use in the office.',
      },
      {
        name: 'Desk Organizer',
        description:
          'A multi-compartment desk organizer to keep your office supplies like pens, paperclips, and sticky notes neatly arranged.',
      },
      {
        name: 'Notebooks',
        description:
          'A pack of high-quality notebooks with ruled pages, perfect for jotting down notes, ideas, and to-do lists.',
      },
      {
        name: 'Sticky Notes',
        description:
          'A collection of colorful sticky notes that can be easily attached to documents or surfaces for reminders and memos.',
      },
      {
        name: 'Paper Clips',
        description:
          'A box of metal paper clips for securing documents or organizing papers together.',
      },
      {
        name: 'Stapler',
        description:
          'A sturdy stapler for fastening sheets of paper together, ideal for reports, presentations, and other documents.',
      },
      {
        name: 'File Folders',
        description:
          'A set of durable file folders with tabs for organizing and categorizing important documents.',
      },
      {
        name: 'Whiteboard Markers',
        description:
          'A set of colorful whiteboard markers for writing or drawing on whiteboards during meetings or brainstorming sessions.',
      },
      {
        name: 'Calculator',
        description:
          'A reliable calculator with basic and advanced functions for performing mathematical calculations in the office.',
      },
      {
        name: 'Desk Lamp',
        description:
          'An adjustable desk lamp with a bright LED light, providing optimal lighting for focused work or reading.',
      },
    ];
    const OfficeProductsimageUrls = [
      'https://static.winc.com.au/pi/da/0b750596dfa8abeeffff1e8891498ce8dd83dc-427678/lgsq.jpg',
      'https://pyxis.nymag.com/v1/imgs/0bc/ce2/98b9fab9162eb4a00977b10972f840679a.2x.rsquare.w600.jpg',
      'https://3.imimg.com/data3/WD/JT/MY-2281434/notebooks.jpg',
      'https://i5.walmartimages.com/asr/5fc74baf-0b8a-488e-aaa4-b9ef6cd7a43b.709e8661c019ff826603661fbaf30cfc.jpeg',
      'https://rukminim2.flixcart.com/image/850/1000/xif0q/clip/s/c/n/gem-clips-kesetko-original-imagpjtuuetgqpaz.jpeg?q=20',
      'https://i5.walmartimages.com/asr/005c2d42-382f-4b31-8279-de25d949ee03.dce8aecf2be9d1a1763c321bf14e6fd7.jpeg',
      'https://5.imimg.com/data5/KG/LC/OR/SELLER-25380144/crown-box-file-folder.jpg',
      'https://m.media-amazon.com/images/I/81uJyvkx+rL.jpg',
      'https://m.media-amazon.com/images/I/61yotlsfV3L._AC_UF1000,1000_QL80_.jpg',
      'https://i5.walmartimages.com/asr/5313113e-9508-47e5-bae1-c1df3a558aa2.fc2f711c3f359f832fb926c368dc0cc0.jpeg',
    ];
    for (let i = 0; i < officeSuppliesProducts.length; i++) {
      const product = officeSuppliesProducts[i];
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
        category_id: 6,
        vendor_id: 1,
        image: OfficeProductsimageUrls[i].split(','),
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
