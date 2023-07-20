'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Members", [
      {
        code: 'M001',
        name: 'Angga',
        penalty: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: 'M002',
        name: 'Ferry',
        penalty: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: 'M003',
        name: 'Putri',
        penalty: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Members", null, {});
  },
};
