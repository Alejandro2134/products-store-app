'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('products', [
      {
        name: 'Acoustic Guitar',
        price: 499.99,
        stock: 80,
        description: 'High-quality acoustic guitar with a rich sound.',
      },
      {
        name: 'Electric Guitar',
        price: 799.99,
        stock: 50,
        description:
          'Versatile electric guitar suitable for various music styles.',
      },
      {
        name: 'Drum Set',
        price: 1299.99,
        stock: 50,
        description: 'Complete drum set with cymbals and hardware included.',
      },
      {
        name: 'Keyboard',
        price: 599.99,
        stock: 90,
        description: 'Digital keyboard with weighted keys and multiple sounds.',
      },
      {
        name: 'Violin',
        price: 899.99,
        stock: 40,
        description: 'Professional violin with a beautiful finish and sound.',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('products', null, {});
  },
};
