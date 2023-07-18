const generateRandomPrice = require('../../utils/randomPrice');

module.exports = {
  async up(queryInterface) {
    const products = [];
    const frozenFoodProducts = [
      {
        name: 'Pizza',
        description:
          'Delicious and convenient pizza with a variety of toppings. Just bake and enjoy!',
      },
      {
        name: 'Chicken Nuggets',
        description: 'Crispy breaded chicken nuggets, perfect as a snack or for a quick meal.',
      },
      {
        name: 'Frozen Vegetables',
        description:
          'Assorted frozen vegetables, ready to be cooked or added to your favorite recipes.',
      },
      {
        name: 'Ice Cream',
        description: 'Creamy and indulgent frozen dessert available in various flavors.',
      },
      {
        name: 'Frozen Fish Fillets',
        description:
          'High-quality fish fillets, frozen at their peak freshness for a delicious seafood meal.',
      },
      {
        name: 'Frozen Burritos',
        description:
          'Convenient and flavorful frozen burritos, packed with fillings like beans, cheese, and meat.',
      },
      {
        name: 'Frozen French Fries',
        description: 'Crispy and golden frozen French fries, perfect as a side dish or snack.',
      },
      {
        name: 'Frozen Shrimp',
        description:
          'Tasty and versatile frozen shrimp, great for adding to pasta dishes or stir-fries.',
      },
      {
        name: 'Frozen Fruit',
        description:
          'A mix of frozen fruits, ideal for smoothies, desserts, or as a refreshing snack.',
      },
      {
        name: 'Breakfast Sandwich',
        description:
          'A convenient and satisfying frozen breakfast sandwich, featuring eggs, cheese, and meat on a bun.',
      },
    ];
    const FrozenFoodImageUrls = [
      'https://www.annisarestaurant.com/upload/images/how-long-is-pizza-good-for-in-the-fridge-4-1.jpg',
      'https://static.toiimg.com/thumb/83114901.cms?width=1200&height=900',
      'https://i5.walmartimages.com/asr/23d600ee-cb41-433c-8233-dc1a45b54bd7.7279dc7c4c5398497525aeaa93ec8f3f.jpeg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO-aWR7au8hwrB2aFVqnMLW8l1-yc6Bud_A4F3mPXLfvpt1i4fO7VDn32Az0cVaUthK2I&usqp=CAU',
      'https://www.tastingtable.com/img/gallery/is-your-frozen-fish-mushy-heres-why/intro-1649691956.jpg',
      'https://thymeandjoy.com/wp-content/uploads/2022/02/Air-Fryer-Frozen-Burrito-3-of-3-e1645524526950-500x500.jpg',
      'https://hips.hearstapps.com/hmg-prod/images/oreidagoldencrispersfries-1634648020.jpeg',
      'https://media.nedigital.sg/fairprice/fpol/media/images/product/XL/13047082_XL1_20210216.jpg',
      'https://i5.walmartimages.com/asr/0c70536d-be8f-4154-b57e-c3d616b82625.b3f5b7f7ddef793886bef71c2527d784.jpeg',
      'https://www.organizeyourselfskinny.com/wp-content/uploads/2021/08/1-15.jpg',
    ];
    for (let i = 0; i < frozenFoodProducts.length; i++) {
      const product = frozenFoodProducts[i];
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
        category_id: 3,
        vendor_id: 5,
        image: FrozenFoodImageUrls[i].split(','),
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
