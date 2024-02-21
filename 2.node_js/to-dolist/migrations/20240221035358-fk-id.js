'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint("schedules", {
      fields : ["user_id"],
      type : "foreign key",
      name : "id_fk",
      references : {
        table : "users",
        field : "id",
      },
      onDelete : "cascade",
      onUpdate : "cascade"
    });
  },

  async down (queryInterface, Sequelize) {
  }
};
