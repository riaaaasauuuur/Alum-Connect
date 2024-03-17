"use strict";

import BaseModel from "../utils/BaseModel.js";
import bcrypt from "bcrypt";

export default (sequelize, DataTypes) => {
  class Users extends BaseModel {
    static associate(models) {

      this.belongsTo(models.Roles, {
        foreignKey: "roleId",
        as: "role"
      });

      this.belongsTo(models.UserDetails, {
        foreignKey: "detailsId",
        as: "details"
      });

    }
  }

  Users.init(
    {
      _id: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      // username: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastLogin: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      accountType: {
        type: DataTypes.ENUM("ALUMNI", "ADMIN"),
        allowNull: false,
      },
      detailsId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        unique: false,
        allowNull: true,
        autoIncrement: false,
        primaryKey: false,
        defaultValue: true,
      },
      passwordResetToken: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: true,
        autoIncrement: false,
        primaryKey: false,
      },
      notificationTokens: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        unique: false,
        allowNull: true,
        autoIncrement: false,
        primaryKey: false,
      },
      loginAttempts: {
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: true,
        autoIncrement: false,
        primaryKey: false,
      },
      lockedDate: {
        type: DataTypes.DATE,
        unique: false,
        allowNull: true,
        autoIncrement: false,
        primaryKey: false,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        unique: false,
        allowNull: true,
        autoIncrement: false,
        primaryKey: false,
        defaultValue: false
      },
      temporaryPassword: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: true,
        autoIncrement: false,
        primaryKey: false
      },
      allowedNotifications: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        unique: false,
        allowNull: true,
        autoIncrement: false,
        primaryKey: false,
        defaultValue: ['EVENTS', 'JOBS', 'SURVEYS', 'DONATIONS']
      },
    },
    {
      sequelize,
      modelName: "Users",
    }
  );

  Users.beforeCreate(async (user, options) => {
    user.createdAt = new Date();
    user.isActive = true;
    if (user.password) {
      const salt = bcrypt.genSaltSync(5);
      const hash = bcrypt.hashSync(user.password, salt);
      user.password = hash;
    }
  });

  Users.prototype.encryptPassword = function (password) {
    const salt = bcrypt.genSaltSync(5);
    return bcrypt.hashSync(password, salt);
  };

  Users.prototype.isValid = async function (password) {
    return await bcrypt.compare(password, this.password);
  };


  return Users;
};
