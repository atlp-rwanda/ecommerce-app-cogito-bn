/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    // Generate 1000 random productViews records
    const productViews = [];

    for (let i = 0; i < 500; i++) {
      // Generate random product ID between 1 and 50
      const productId = Math.floor(Math.random() * (50 - 1 + 1)) + 1;
      // Generate random buyer ID between 1 and 100
      const buyerId = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
      productViews.push({
        productId,
        buyerId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Insert the generated data into the productViews table
    await queryInterface.bulkInsert('productViews', productViews);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('productViews', null, {});
  },
};
