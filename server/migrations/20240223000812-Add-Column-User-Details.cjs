'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await Promise.all([
      queryInterface.addColumn('UserDetails', 'latinHonors', {
        type: Sequelize.ENUM('CUM_LAUDE', 'MAGNA_CUM_LAUDE', 'SUMMA_CUM_LAUDE'),
        allowNull: true,
      }),
      queryInterface.addColumn('UserDetails', 'isBoardPasser', {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      }),
      queryInterface.addColumn('UserDetails', 'prc', {
        type: Sequelize.STRING(10000),
        allowNull: true,
      }),
      queryInterface.addColumn('Courses', 'hasBoard', {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      }),
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
