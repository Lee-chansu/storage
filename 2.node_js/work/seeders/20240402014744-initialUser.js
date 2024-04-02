"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {userID : 'tree', password : '1234'},
      {userID : 'pink', password : '1234'},
      {userID : 'blue', password : '1234'},
      {userID : 'love', password : '1234'}
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
