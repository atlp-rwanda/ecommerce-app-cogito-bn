'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('categories', [
      {
        name: 'Fashion',
        image:
          'https://res.cloudinary.com/dvdmnpf99/image/upload/v1683400177/dbouimuxxvdbquzc9ptr.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Education Products',
        image:
          'https://res.cloudinary.com/dvdmnpf99/image/upload/v1683400177/dbouimuxxvdbquzc9ptr.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Frozen Foods',
        image:
          'https://res.cloudinary.com/dvdmnpf99/image/upload/v1683400177/dbouimuxxvdbquzc9ptr.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Beverages',
        image:
          'https://res.cloudinary.com/dvdmnpf99/image/upload/v1683400177/dbouimuxxvdbquzc9ptr.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Organic Groceries',
        image:
          'https://res.cloudinary.com/dvdmnpf99/image/upload/v1683400177/dbouimuxxvdbquzc9ptr.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Office Supplies',
        image:
          'https://res.cloudinary.com/dvdmnpf99/image/upload/v1683400177/dbouimuxxvdbquzc9ptr.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Books',
        image:
          'https://res.cloudinary.com/dvdmnpf99/image/upload/v1683400177/dbouimuxxvdbquzc9ptr.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Beauty Products',
        image:
          'https://res.cloudinary.com/dvdmnpf99/image/upload/v1683400177/dbouimuxxvdbquzc9ptr.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Electronic Gadgets',
        image:
          'https://res.cloudinary.com/dvdmnpf99/image/upload/v1683400177/dbouimuxxvdbquzc9ptr.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Fitness',
        image:
          'https://res.cloudinary.com/dvdmnpf99/image/upload/v1683400177/dbouimuxxvdbquzc9ptr.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sneakers',
        image:
          'https://res.cloudinary.com/dvdmnpf99/image/upload/v1683400177/dbouimuxxvdbquzc9ptr.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categories', null, {});
  },
};
