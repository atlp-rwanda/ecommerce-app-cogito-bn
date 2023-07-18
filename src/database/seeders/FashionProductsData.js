const generateRandomPrice = require('../../utils/randomPrice');

module.exports = {
  async up(queryInterface) {
    const products = [];
    const FashionProductsData = [
      {
        name: 'Silk Scarf',
        description:
          'A luxurious silk scarf with a vibrant floral pattern. Perfect for adding a touch of elegance to any outfit.',
      },
      {
        name: 'Leather Boots',
        description:
          'Stylish leather boots with a stacked heel. Made with premium leather for durability and comfort.',
      },
      {
        name: 'Sunglasses',
        description:
          'Classic aviator sunglasses with tinted lenses. Designed with UV protection for both style and eye safety.',
      },
      {
        name: 'Cashmere Sweater',
        description:
          'A cozy cashmere sweater in a relaxed fit. Made with ultra-soft cashmere for warmth and comfort.',
      },
      {
        name: 'Tailored Suit',
        description:
          'A sophisticated tailored suit in a slim-fit design. Made with premium fabric for a polished look.',
      },
      {
        name: 'Wedding Gown',
        description:
          'An exquisite Weddding gown with intricate beadwork. Designed for special occasions and wedding events.',
      },
      {
        name: 'Leather Belt',
        description:
          'A classic leather belt with a timeless buckle. Made with genuine leather for durability and style.',
      },
      {
        name: 'Made In Rwanda Handbag',
        description:
          'A Made In Rwanda handbag with a spacious interior. Crafted with attention to detail and high-quality materials.',
      },
      {
        name: 'Trench Coat',
        description:
          'A stylish trench coat with a belted waist. Made with water-resistant fabric for protection against the elements.',
      },
      {
        name: 'Silk Blouse',
        description:
          'A feminine silk blouse with a delicate floral print. Designed with a relaxed fit for effortless style.',
      },
      {
        name: 'Leather Wallet',
        description:
          'A sleek leather wallet with multiple card slots and a zippered coin pocket. Made with premium leather.',
      },
      {
        name: 'Printed Maxi Dress',
        description:
          'A vibrant printed maxi dress with a flowy silhouette. Perfect for summer occasions and beach getaways.',
      },
      {
        name: 'Cotton T-Shirt',
        description:
          'A basic cotton t-shirt with a comfortable fit. Ideal for casual everyday wear.',
      },
      {
        name: 'High-Waisted Jeans',
        description:
          'Flattering high-waisted jeans with a slimming effect. Made with stretch denim for comfort and flexibility.',
      },
      {
        name: 'Silk Kimono',
        description:
          'An elegant silk kimono with a traditional Japanese-inspired design. Luxurious and sophisticated.',
      },
      {
        name: 'Leather Crossbody Bag',
        description:
          'A stylish leather crossbody bag with a compact size. Perfect for carrying essentials while on the go.',
      },
      {
        name: 'Knit Sweater',
        description:
          'A cozy knit sweater with a relaxed fit. Made with soft and warm yarn for chilly days.',
      },
      {
        name: 'Designer Watch',
        description:
          'An elegant designer watch with a stainless steel strap. A timeless accessory for any occasion.',
      },
      {
        name: 'Embroidered Blouse',
        description:
          'A bohemian-inspired embroidered blouse with intricate detailing. Adds a touch of artistry to any outfit.',
      },
      {
        name: 'Leather Jacket',
        description:
          'A classic leather jacket with a moto-inspired design. Made with high-quality leather for a rugged look.',
      },
      {
        name: 'Strappy Heels',
        description:
          'Elegant strappy heels with a stiletto heel. Designed for a sophisticated and feminine look.',
      },
      {
        name: 'Cashmere Scarf',
        description:
          'A luxurious cashmere scarf with a soft and warm feel. Adds elegance and warmth to any outfit.',
      },
      {
        name: 'Printed Midi Skirt',
        description:
          'A vibrant printed midi skirt with a pleated design. Adds a playful and stylish touch to your wardrobe.',
      },
    ];

    const FashionimageUrls = [
      'https://images.pexels.com/photos/1056862/pexels-photo-1056862.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://media.istockphoto.com/id/505699305/photo/ready-for-parade-detail.webp?b=1&s=170667a&w=0&k=20&c=fnoJG9wZAEsKMDVk0PZ3OOIGxlYtkqy_FY-pF7Lhr7Q=',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U3VuZ2xhc3Nlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
      'https://plus.unsplash.com/premium_photo-1661427122177-79a779af1d77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Q2FzaG1lcmUlMjBTd2VhdGVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81lH7Mcm4tPE-Z9iuWBHP6X2QA_J-wTfrRQ&usqp=CAU',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDs6Yqygy8Yoe6jJOYNtZ1bJz0cDf6O0aXoZRQ1OHk6-7vAvHLNdRblhN-BzOjLZGJWIQ&usqp=CAU',
      'https://images.unsplash.com/photo-1591117105338-4eb266b13c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TGVhdGhlciUyMEJlbHR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
      'https://images.teemill.com/pwoqc1hcg5a8g5el4bpk24n8b0kkizcwakfqfszte0rbtv3r.png.png?w=1080&h=auto',
      'https://ae01.alicdn.com/kf/S014936c9fc544a9d85db52181d784634y/Formal-Men-trench-Coat-Overcoat-Full-Length-Slim-Fit-Classic-Long-Jacket-Windproof-Windbreaker-for-Dating.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwjW6X4J_Ngw_LgV--jj7V92ImvHjMPpOrZ12c1pytFx5-gKsXogfJur94woQS7NkBudE&usqp=CAU',
      'https://images.unsplash.com/photo-1517254797898-04edd251bfb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TGVhdGhlciUyMFdhbGxldHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
      'https://media.istockphoto.com/id/484508802/photo/asian-woman-yellow-half-peplum-sleeve-wrapped-waist-dress-hat.webp?b=1&s=170667a&w=0&k=20&c=7ZBK53N1r5XkSvUfC38si70qoC9Mtk9LDVdVMfCIi88=',
      'https://images.pexels.com/photos/4066293/pexels-photo-4066293.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE648MLXWYQ5nlICFOcErVR7kaORchGGvGdV20n_HPD1_6Q6u_43pfLDV1qkmtusfAX98&usqp=CAU',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScVCKtZ0C0v-jkZmYWr7MhIx89AzOzi6HKDQ&usqp=CAU',
      'https://www.jackgeorges.com/cdn/shop/products/7203honey-front_1600x.jpg?v=1616217023',
      'https://plus.unsplash.com/premium_photo-1670512206220-1d9b433d812e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8S25pdCUyMFN3ZWF0ZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
      'https://www.mrporter.com/variants/images/1647597284264409/in/w358_q60.jpg',
      'https://media.fatface.com/i/Fat_Face/977031_Ivory_Model_Front_1?%24pdp-primary-lge%24&fmt=auto',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TGVhdGhlciUyMEphY2tldHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1524553879936-2ff074ae5816?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fFN0cmFwcHklMjBIZWVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1670490340295-95b418fe59a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q2FzaG1lcmUlMjBTY2FyZnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
      'https://images.asos-media.com/products/asos-design-satin-bias-midi-skirt-in-animal-print/204196772-1-multi?$n_640w$&wid=513&fit=constrain',
    ];
    // Generate 100 unique products
    for (let i = 0; i < FashionProductsData.length; i++) {
      const product = FashionProductsData[i];
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
        category_id: 1,
        vendor_id: 3,
        image: FashionimageUrls[i].split(','),
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
