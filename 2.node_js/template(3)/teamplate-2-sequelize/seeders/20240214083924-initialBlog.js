'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('blogs', [{
    title: '동에번쩍서에번쩍',
    content: '옛날옛적~아주먼~옛날에!!!'
    }], {});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('blogs', null, {});
  }
};
