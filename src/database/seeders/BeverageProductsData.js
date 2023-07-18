const generateRandomPrice = require('../../utils/randomPrice');

module.exports = {
  async up(queryInterface) {
    const products = [];
    const beverageProducts = [
      {
        name: 'Inyange Water',
        description:
          'Refreshing carbonated water with a clean and crisp taste. Perfect for quenching your thirst.',
      },
      {
        name: 'Green Tea',
        description:
          'A soothing and antioxidant-rich tea made from the leaves of Camellia sinensis. Known for its health benefits.',
      },
      {
        name: 'Inyange Orange Juice',
        description:
          'Freshly squeezed orange juice with a tangy and citrusy flavor. Packed with vitamin C.',
      },
      {
        name: 'Inyange Mango Juice',
        description:
          'Freshly squeezed mango juice with a tangy and citrusy flavor. Packed with vitamin C.',
      },
      {
        name: 'Inyange Apple Juice',
        description:
          'Freshly squeezed apple juice with a tangy and citrusy flavor. Packed with vitamin C.',
      },
      {
        name: 'Inyange Whole Milk',
        description: 'Fresh Inyange Whole Milk',
      },
      {
        name: 'Iced Coffee',
        description:
          'Chilled coffee served over ice, perfect for a refreshing pick-me-up on a hot day.',
      },
      {
        name: 'Mango Smoothie',
        description:
          'A creamy and tropical blend of ripe mangoes and yogurt. A delightful and nutritious beverage.',
      },
      {
        name: 'Lemonade',
        description:
          'A classic summertime drink made with freshly squeezed lemons, sugar, and water. Sweet and tart.',
      },
      {
        name: 'Coconut Water',
        description:
          'The clear liquid found inside young coconuts, known for its hydrating and electrolyte-rich properties.',
      },
      {
        name: 'Hot Chocolate',
        description:
          'A rich and comforting drink made with melted chocolate or cocoa powder, milk, and sugar.',
      },
      {
        name: 'Ginger Beer',
        description:
          'A spicy and effervescent beverage made from fermented ginger, sugar, and water. Perfect for cocktails or as a standalone drink.',
      },
      {
        name: 'Apple Cider',
        description:
          'A sweet and tangy beverage made from pressed apples. Often enjoyed during the fall season.',
      },
      {
        name: 'Skol',
        description:
          'Skol is a popular international beer known for its crisp and refreshing taste. Brewed using high-quality ingredients.',
      },
      {
        name: 'Heineken',
        description:
          'Heineken is a globally recognized beer with a distinctive green bottle. It has a balanced flavor and a smooth finish.',
      },
      {
        name: 'Primus',
        description:
          'Primus is a well-known Rwandan beer that offers a light and refreshing drinking experience. Perfect for social gatherings.',
      },
      {
        name: 'Virunga',
        description:
          'Virunga is a local Rwandan beer crafted with care to deliver a unique and flavorful taste. Made from locally sourced ingredients.',
      },
      {
        name: 'Mitzing',
        description:
          'Mitzing is a popular Rwandan beer known for its smooth and satisfying flavor profile. Brewed using traditional brewing techniques.',
      },
    ];
    const BeverageimageUrls = [
      'https://www.inyangeindustries.com/img/slider/Inyange-Water-image-1-sm.png',
      'https://m.media-amazon.com/images/I/61vhbGIVQeL.jpg',
      'https://murukali.com/cdn/shop/files/Orange-Inyange-Juice-L-murukali-com-905_1200x1200.jpg?v=1685762890',
      'https://store2door.rw/wp-content/uploads/2020/04/1L_TETRAPAK_Mango-247x296.jpg',
      'https://store2door.rw/wp-content/uploads/2020/04/1L_TETRAPAK_Apple-247x296.jpg',
      'https://store2door.rw/wp-content/uploads/2018/08/Milk-Box-247x296.png',
      'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8SWNlZCUyMENvZmZlZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1604298331663-de303fbc7059?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8TWFuZ28lMjBTbW9vdGhpZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1621263764928-df1444c5e859?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8TGVtb25hZGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1518484157348-2cd88dc70d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Q29jb251dCUyMFdhdGVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1608651057580-4a50b2fc2281?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fEhvdCUyMENob2NvbGF0ZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1623870605316-bf5942ddb1d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8R2luZ2VyJTIwQmVlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
      'https://www.bragg.com/cdn/shop/files/mega-menu-product-ACV_1000x.png?v=1619718957',
      'https://www.skolbrewery.rw/wp-content/uploads/2022/01/Malt-with-Glass.png',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR42JWa5jSVLvQQv8qjTtbAgyWwj9KQDS80-NEmbNqKobTIwT8AsHcPjBL8W7J_DIvUDdY&usqp=CAU',
      'https://i0.wp.com/www.sloditech.com/wp-content/uploads/2017/12/bouteille-primus-brazza-scaled-e1595376238189.jpg?fit=1500%2C2250&ssl=1',
      'https://assets.untappd.com/photos/2023_07_05/aedec4d77dc277644d5632fd94be7ba7_640x640.jpg',
      'https://awale29.fr/web/image/product.template/771/image_1024?unique=954b95c',
    ];
    for (let i = 0; i < beverageProducts.length; i++) {
      const product = beverageProducts[i];
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
        category_id: 4,
        vendor_id: 5,
        image: BeverageimageUrls[i].split(','),
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
