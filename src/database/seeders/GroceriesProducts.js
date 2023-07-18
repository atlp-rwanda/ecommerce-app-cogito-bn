const generateRandomPrice = require('../../utils/randomPrice');

module.exports = {
  async up(queryInterface) {
    const products = [];
    const organicGroceries = [
      {
        name: 'Organic Kale',
        description:
          'Fresh and nutritious kale leaves packed with vitamins and minerals. Perfect for salads and smoothies.',
      },
      {
        name: 'Organic Quinoa',
        description:
          'A gluten-free grain packed with protein, fiber, and essential amino acids. Versatile and nutritious.',
      },
      {
        name: 'Organic Avocado',
        description:
          'Creamy and nutrient-rich avocados known for their healthy fats and high potassium content.',
      },
      {
        name: 'Apples',
        description:
          'Crisp and juicy apples packed with fiber and vitamins. Perfect for snacking or baking.',
      },
      {
        name: 'Bananas',
        description:
          'Naturally sweet and potassium-rich bananas. Great for adding to smoothies or enjoying as a quick energy boost.',
      },
      {
        name: 'Broccoli',
        description:
          'Nutrient-rich broccoli florets packed with vitamins and minerals. Ideal for stir-fries or steaming.',
      },
      {
        name: 'Carrots',
        description:
          'Crunchy and vibrant orange carrots loaded with beta-carotene and antioxidants. Ideal for salads or roasting.',
      },
      {
        name: 'Strawberries',
        description:
          'Juicy and sweet strawberries bursting with flavor. Perfect for adding to desserts or enjoying fresh.',
      },
      {
        name: 'Spinach',
        description:
          'Dark leafy green spinach packed with iron and other essential nutrients. Great for salads or sautéing.',
      },
      {
        name: 'Tomatoes',
        description:
          'Ripe and juicy tomatoes that add freshness to any dish. Perfect for salads, sandwiches, or sauces.',
      },
      {
        name: 'Oranges',
        description:
          'Citrusy and refreshing oranges packed with vitamin C. Great for juicing or enjoying as a snack.',
      },
      {
        name: 'Cucumbers',
        description:
          'Cool and hydrating cucumbers with a crisp texture. Ideal for salads, sandwiches, or refreshing drinks.',
      },
      {
        name: 'Bell Peppers',
        description:
          'Colorful and crunchy bell peppers packed with antioxidants and vitamin C. Perfect for stir-fries or raw snacking.',
      },
    ];
    const GroceriesimageUrls = [
      'https://images.pexels.com/photos/5758072/pexels-photo-5758072.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/7420982/pexels-photo-7420982.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://theproducenews.com/sites/default/files/inline-images/avc.jpg',
      'https://post.healthline.com/wp-content/uploads/2020/09/Do_Apples_Affect_Diabetes_and_Blood_Sugar_Levels-732x549-thumbnail-1-732x549.jpg',
      'https://www.daysoftheyear.com/wp-content/uploads/banana-day1-scaled.jpg',
      'https://domf5oio6qrcr.cloudfront.net/medialibrary/5390/h1218g16207258089583.jpg',
      'https://images.squarespace-cdn.com/content/v1/5de5df7f9f40c13aa6a8b579/1579656596851-2C3FEKRQPB2RC0RII0OZ/Boat+harbour-0829.jpg?format=1000w',
      'https://clv.h-cdn.co/assets/15/22/2560x1728/gallery-1432664914-strawberry-facts1.jpg',
      'https://i0.wp.com/post.healthline.com/wp-content/uploads/2019/05/spinach-1296x728-header.jpg?w=1155&h=1528',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKBSBK08RX5Z7d-uwzrAzfO4QoMbBJ_el4V0bUvgrl13o5Vb025MWKd8DNC1Y-tSpwZMM&usqp=CAU',
      'https://cdn-prod.medicalnewstoday.com/content/images/articles/272/272782/oranges-in-a-box.jpg',
      'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3VjdW1iZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1601648764658-cf37e8c89b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVsbCUyMHBlcHBlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    ];
    for (let i = 0; i < organicGroceries.length; i++) {
      const product = organicGroceries[i];
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
        category_id: 5,
        vendor_id: 5,
        image: GroceriesimageUrls[i].split(','),
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
