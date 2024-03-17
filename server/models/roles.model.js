"use strict";

import BaseModel from "../utils/BaseModel.js";

export default (sequelize, DataTypes) => {
  class Roles extends BaseModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }

  Roles.init(
    {
      _id: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      scopes: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        unique: false,
        allowNull: true,
        autoIncrement: false,
        primaryKey: false,
        defaultValue: true,
      }
    },
    {
      sequelize,
      updatedAt: "updateAt",
      modelName: "Roles",
    }
  );


  return Roles;
};
