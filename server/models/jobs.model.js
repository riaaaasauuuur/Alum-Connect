"use strict";

import BaseModel from "../utils/BaseModel.js";

export default (sequelize, DataTypes) => {
  class Jobs extends BaseModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Users, {
        foreignKey: "createdById",
        as: "createdBy"
      });
    }
  }

  Jobs.init(
    {
      _id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true
      },
      thumbnail: {
        type: DataTypes.JSON,
        allowNull: true
      },
      attachment: {
        type: DataTypes.JSON,
        allowNull: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true
      },
      company: {
        type: DataTypes.STRING,
        allowNull: true
      },
      jobType: {
        type: DataTypes.ENUM('FULL_TIME', 'PART_TIME'),
        allowNull: true
      },
      vacancy: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      status: {
        type: DataTypes.ENUM('PENDING', 'ACTIVE', 'ARCHIVED', 'REJECTED'),
        allowNull: true
      },
      description: {
        type: DataTypes.STRING(10000),
        allowNull: true
      },
      notes: {
        type: DataTypes.STRING(10000),
        allowNull: true
      },
      postedBy: {
        type: DataTypes.STRING,
        allowNull: true
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
      },
      createdById: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      modifiedById: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
    },
    {
      sequelize,
      modelName: "Jobs",
    }
  );


  return Jobs;
};
