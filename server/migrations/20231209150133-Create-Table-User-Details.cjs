'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("UserDetails", {
      _id: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      middleName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      suffix: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      birthday: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      avatar: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      mobileNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        unique: false,
        allowNull: true,
        autoIncrement: false,
        primaryKey: false,
        defaultValue: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('UserDetails', 'uniqueId', {
          type: Sequelize.DataTypes.STRING,
          unique: false,
          allowNull: false,
          autoIncrement: false,
          primaryKey: false,
        }, { transaction: t }),
        queryInterface.addColumn('UserDetails', 'gender', {
          type: Sequelize.DataTypes.ENUM('M', 'F'),
          unique: false,
          allowNull: true,
          autoIncrement: false,
          primaryKey: false,
        }, { transaction: t }),
        queryInterface.addColumn('UserDetails', 'graduatedAt', {
          type: Sequelize.DataTypes.DATE,
          unique: false,
          allowNull: true,
          autoIncrement: false,
          primaryKey: false,
        }, { transaction: t }),
        queryInterface.addColumn('UserDetails', 'courseTaken', {
          type: Sequelize.DataTypes.STRING,
          unique: false,
          allowNull: true,
          autoIncrement: false,
          primaryKey: false,
        }, { transaction: t }),
      ]);
    });
  }
};
