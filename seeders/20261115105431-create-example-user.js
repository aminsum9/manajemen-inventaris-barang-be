'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('users', [
      {
        name: 'user 1',
        email: 'user1@gmail.com',
        password: '$2a$12$OhJPEc7Z1rY26Xw86jZUV.9b53CmFDyQ.HsFLBT5cagfXBST.Z9Gq',
        token: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
