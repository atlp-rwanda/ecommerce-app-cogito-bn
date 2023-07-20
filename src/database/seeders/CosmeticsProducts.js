const generateRandomPrice = require('../../utils/randomPrice');

module.exports = {
  async up(queryInterface) {
    const products = [];
    const beautyCosmeticsProducts = [
      {
        name: 'Rose Quartz Facial Roller',
        description:
          'A rose quartz facial roller used for facial massage to improve circulation and reduce puffiness.',
      },
      {
        name: 'Glowing Highlighter Palette',
        description:
          'A palette of glowing highlighter shades that enhance the high points of the face for a radiant look.',
      },
      {
        name: 'Lipstick Set',
        description:
          'A set of vibrant and long-lasting lipsticks in a variety of shades for different occasions.',
      },
      {
        name: 'Eyeshadow Palette',
        description:
          'An eyeshadow palette with a range of matte and shimmer shades for creating versatile eye looks.',
      },
      {
        name: 'Mascara',
        description:
          'A volumizing and lengthening mascara that adds drama and intensity to the eyelashes.',
      },
      {
        name: 'BB Cream',
        description:
          'A lightweight and multitasking beauty balm that provides coverage, hydration, and sun protection.',
      },
      {
        name: 'Makeup Brushes Set',
        description:
          'A set of high-quality makeup brushes for applying foundation, blush, eyeshadow, and more.',
      },
      {
        name: 'Liquid Eyeliner',
        description:
          'A precise and smudge-proof liquid eyeliner for creating bold and defined eye looks.',
      },
      {
        name: 'Face Mask',
        description:
          'A hydrating and rejuvenating face mask infused with natural ingredients for a pampering skincare experience.',
      },
      {
        name: 'Nail Polish Set',
        description:
          'A set of trendy and vibrant nail polish colors for creating beautiful manicures.',
      },
    ];
    const CosmeticsimageUrls = [
      'https://images.unsplash.com/photo-1600428877878-1a0fd85beda8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Um9zZSUyMFF1YXJ0eiUyMEZhY2lhbCUyMFJvbGxlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
      'https://elliebeauty.com.au/wp-content/uploads/2021/08/Multi-Glow_Highlight_Palette.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTilqp_j4ORvKqvi7equ2snJu6ZStt0zM63bImQ3gcmn20_hS3UwRCPgbaAM54-rHpxzM&usqp=CAU',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fEV5ZXNoYWRvdyUyMFBhbGV0dGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1619168213439-8af6b0fd5956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fE1hc2NhcmF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
      'https://images-static.nykaa.com/media/catalog/product/0/3/03d00de8904245705411_1.jpg?tr=w-500,pr-true',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjEtQI7FHOrQY_8_byLTLdv6AtJJc6rrAQyg&usqp=CAU',
      'https://inglotusa.com/21065-large_default/liquid-eyeliner.jpg',
      'https://m.media-amazon.com/images/I/81zgIpHnV7L.jpg',
      'https://m.media-amazon.com/images/I/81AbeX4dK8L.jpg',
    ];
    for (let i = 0; i < beautyCosmeticsProducts.length; i++) {
      const product = beautyCosmeticsProducts[i];
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
        category_id: 8,
        vendor_id: 4,
        image: CosmeticsimageUrls[i].split(','),
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
