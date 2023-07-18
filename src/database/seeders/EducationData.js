const generateRandomPrice = require('../../utils/randomPrice');

module.exports = {
  async up(queryInterface) {
    const products = [];
    const educationProducts = [
      {
        name: 'Interactive Globe',
        description:
          'An interactive globe that allows students to explore geography, learn about countries, and discover fascinating facts.',
      },
      {
        name: 'Math Manipulative Set',
        description:
          'A set of math manipulatives, such as counters, cubes, and shapes, to help students visualize and understand mathematical concepts.',
      },
      {
        name: 'Science Experiment Kit',
        description:
          'A science experiment kit with various experiments and materials to engage students in hands-on learning and scientific discovery.',
      },
      {
        name: 'Educational Board Game',
        description:
          'An educational board game that makes learning fun and interactive while reinforcing important skills and knowledge.',
      },
      {
        name: 'Language Learning Software',
        description:
          'A language learning software that provides interactive lessons, vocabulary exercises, and pronunciation practice.',
      },
      {
        name: 'STEM Building Set',
        description:
          'A STEM building set that allows students to design and construct various structures while developing critical thinking and problem-solving skills.',
      },
      {
        name: 'Educational Puzzle Set',
        description:
          'An educational puzzle set with puzzles that promote cognitive development, problem-solving, and spatial reasoning.',
      },
      {
        name: 'Digital Microscope',
        description:
          'A digital microscope that enables students to magnify and explore objects in detail, fostering curiosity and scientific inquiry.',
      },
      {
        name: 'Literature Classics Collection',
        description:
          'A collection of literature classics that exposes students to timeless stories, literary techniques, and influential authors.',
      },
      {
        name: 'Coding Starter Kit',
        description:
          'A coding starter kit that introduces students to the basics of coding and programming through interactive projects and challenges.',
      },
    ];
    const EducationImageUrls = [
      'https://www.bigw.com.au/medias/sys_master/images/images/h6f/he0/13909782691870.jpg',
      'https://www.hand2mind.com/media/catalog/product/e/6/e69ebd9430eed7eba46347aa4d9c17624f3bec4d.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=480&width=480&canvas=480:480',
      'https://m.media-amazon.com/images/I/91RQ3Q4JsSL._AC_UF894,1000_QL80_.jpg',
      'https://m.media-amazon.com/images/I/61k6Z-cTUfL._AC_UF894,1000_QL80_.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCj4rlc2SslpVeNRB-Izs0ENb9mMsiWOWe4A&usqp=CAU',
      'https://brackitz.com/cdn/shop/products/120_pc_Brackitz_Young_Engineer_STEM_Building_Set_BZ83009_858605005520_BOX_2000x.jpg?v=1566403363',
      'https://www.toytownstores.com/images/in-the-night-garden-4-in-1-puzzle-set-game-kids-children-educational-fun-p4649-10135_image.jpg',
      'https://media.elektor.com/media/catalog/product/cache/9cc822bfc6a57f9729d464b8b5e0e0df/a/n/andonstar-ad407-digital-microscope.jpg',
      'https://www.ttf.org/wp-content/uploads/2020/09/wise-books-scaled-600x400.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGxJkF4RvRhZkJmHsCUhxBqoHra0wkXSAA_Q&usqp=CAU',
    ];
    for (let i = 0; i < educationProducts.length; i++) {
      const product = educationProducts[i];
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
        category_id: 2,
        vendor_id: 1,
        image: EducationImageUrls[i].split(','),
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
