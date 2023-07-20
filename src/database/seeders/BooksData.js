const generateRandomPrice = require('../../utils/randomPrice');

module.exports = {
  async up(queryInterface) {
    const products = [];
    const bookProducts = [
      {
        name: 'The Great Gatsby',
        description:
          'A captivating novel set in the roaring twenties, exploring themes of wealth, love, and the pursuit of the American Dream.',
      },
      {
        name: 'To Kill a Mockingbird',
        description:
          'A powerful story set in the 1930s Deep South, highlighting racial injustice and the loss of innocence.',
      },
      {
        name: 'Pride and Prejudice',
        description:
          'A classic romantic novel by Jane Austen, following the spirited Elizabeth Bennet as she navigates love and societal expectations.',
      },
      {
        name: '1984',
        description:
          'A dystopian masterpiece by George Orwell, depicting a totalitarian society where Big Brother watches everyone.',
      },
      {
        name: 'The Catcher in the Rye',
        description:
          'A coming-of-age novel featuring Holden Caulfield, a disillusioned teenager navigating the complexities of adolescence and society.',
      },
      {
        name: "Harry Potter and the Sorcerer's Stone",
        description:
          'The first book in the beloved Harry Potter series, introducing readers to the magical world of Hogwarts and the boy wizard.',
      },
      {
        name: 'The Lord of the Rings',
        description:
          'An epic fantasy trilogy by J.R.R. Tolkien, following Frodo Baggins on his perilous quest to destroy the One Ring.',
      },
      {
        name: 'The Alchemist',
        description:
          'A philosophical novel by Paulo Coelho, telling the story of a young shepherd boy on a journey to discover his personal legend.',
      },
      {
        name: 'The Hunger Games',
        description:
          'A thrilling dystopian series by Suzanne Collins, featuring Katniss Everdeen and her fight against a brutal totalitarian regime.',
      },
      {
        name: 'The Da Vinci Code',
        description:
          'A gripping thriller by Dan Brown, intertwining art, history, and religion in a quest for a hidden secret.',
      },
    ];
    const BooksimageUrls = [
      'https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgnLQFdWciyLaBinPY8lOE4l2T1iwtbQlW3g&usqp=CAU',
      'https://i.pinimg.com/originals/bd/29/34/bd293499ee09b8fa4182f2ae24d83133.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsa4jXUWdYXiF_zCaZjCqUuuf572tqBUjLxw&usqp=CAU',
      'https://target.scene7.com/is/image/Target/GUEST_f23d73cf-1699-4248-a6bf-471ef08a4a65',
      'https://www.foliosociety.com/media/catalog/product/l/t/ltr_book.png?quality=80&fit=bounds&height=&width=&canvas=:',
      'https://keepingupwiththepenguins.com/wp-content/uploads/2019/05/The-Alchemist-Paulo-Coelho-Book-Laid-on-Wooden-Table-Keeping-Up-With-The-Penguins-676x1014.jpg',
      'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2018%2F04%2F45-2000.jpg',
      'https://www.oakknoll.com/pictures/thumb/105311.jpg?v=1465359766',
    ];
    for (let i = 0; i < bookProducts.length; i++) {
      const product = bookProducts[i];
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
        category_id: 7,
        vendor_id: 1,
        image: BooksimageUrls[i].split(','),
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
