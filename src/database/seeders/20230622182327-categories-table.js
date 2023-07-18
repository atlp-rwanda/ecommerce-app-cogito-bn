'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('categories', [
      {
        name: 'Fashion',
        image:
          'https://images.squarespace-cdn.com/content/v1/5432e8d7e4b0fd126503b83b/1548682388873-240C7ICW5RLAT2YL8EDE/still+life+christmas+gifts+mens+fashion+accesories.jpg?format=1000w',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Education Products',
        image:
          'https://media.istockphoto.com/id/1186133659/photo/backpack.jpg?s=612x612&w=0&k=20&c=oCryycWMcLm3NPeeyH_LI276ZcoLcsAPdAVyAw1h1KQ=',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Frozen Foods',
        image:
          'https://www.shefinds.com/files/2022/09/frozen-food-at-the-grocery-store.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Beverages',
        image:
          'https://www.packagingdigest.com/sites/packagingdigest.com/files/AdobeStock_279692163_Editorial_Use_Only-Beverage-FTR-new.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Organic Groceries',
        image:
          'https://www.skh.com/wp-content/uploads/2020/01/iStock-1155240408-1-800x500.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Office Supplies',
        image:
          'https://5.imimg.com/data5/IG/AV/XG/SELLER-53480784/office-stationery-products-500x500.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Books',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQamz5x3D61zX13XjPwvrVjnEC67t4D_re-pXMvGwigFr1CEDTlJpuY-8RVPLRI0HKvwac&usqp=CAU',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Beauty Products',
        image:
          'https://chemicalsinourlife.echa.europa.eu/documents/2934490/2944317/c_cosmetics_lg.jpg/e22a4675-5c9e-8e05-4649-7042a9aed269?t=1560171643352',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Electronic Gadgets',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0gzHFIjmJZWne6GZMFPLr6fVevqRiMRWzG1PoHGuJRY2_TXm53Vdmqr2EDkQwYeJQBIo&usqp=CAU',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Fitness',
        image:
          'https://m.media-amazon.com/images/I/71AyxR0yeeL.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sneakers',
        image:
          'https://nice-assets.s3-accelerate.amazonaws.com/smart_templates/b7875c76ba69e56c8571c037701c7608/assets/preview_c4a66748be6ad5dfdbeb070ec0f51fc3.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categories', null, {});
  },
};
