"use strict";

import BaseModel from "../utils/BaseModel.js";

export default (sequelize, DataTypes) => {
  class Achievements extends BaseModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }

  Achievements.init(
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
      title: {
        type: DataTypes.STRING,
        allowNull: true
      },
      description: {
        type: DataTypes.STRING(10000),
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
      modelName: "Achievements",
    }
  );


  return Achievements;
};
