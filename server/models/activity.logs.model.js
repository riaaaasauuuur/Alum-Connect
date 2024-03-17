"use strict";

import BaseModel from "../utils/BaseModel.js";

export default (sequelize, DataTypes) => {
  class ActivityLogs extends BaseModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }

  ActivityLogs.init(
    {
      _id: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        unique: false,
        allowNull: true,
        autoIncrement: false,
        primaryKey: false,
        defaultValue: true,
      },
      createdById: {
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: true,
        autoIncrement: false,
        primaryKey: false,
      },
    },
    {
      sequelize,
      updatedAt: "updateAt",
      modelName: "ActivityLogs",
    }
  );


  return ActivityLogs;
};
