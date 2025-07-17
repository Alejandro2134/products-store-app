'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('products', [
      {
        name: 'Acoustic Guitar',
        price_in_cents: 50000000,
        stock: 80,
        description: 'High-quality acoustic guitar with a rich sound.',
      },
      {
        name: 'Electric Guitar',
        price_in_cents: 80000000,
        stock: 50,
        description:
          'Versatile electric guitar suitable for various music styles.',
      },
      {
        name: 'Drum Set',
        price_in_cents: 120000000,
        stock: 50,
        description: 'Complete drum set with cymbals and hardware included.',
      },
      {
        name: 'Keyboard',
        price_in_cents: 60000000,
        stock: 90,
        description: 'Digital keyboard with weighted keys and multiple sounds.',
      },
      {
        name: 'Violin',
        price_in_cents: 90000000,
        stock: 40,
        description: 'Professional violin with a beautiful finish and sound.',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('products', null, {});
  },
};
