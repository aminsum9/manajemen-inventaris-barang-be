'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('products', {
      fields: ['stock'],
      type: 'check',
      name: 'stock_must_not_be_negative',
      where: {
        stock: {
          [Sequelize.Op.gte]: 0
        }
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'users',
      'stock_must_not_be_negative'
    );
  }
};
