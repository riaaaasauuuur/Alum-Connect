"use strict";
 
import BaseModel from "../utils/BaseModel.js";
 
export default (sequelize, DataTypes) => {
  class UserDetails extends BaseModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
 
      this.belongsTo(models.Users, {
        foreignKey: "userId",
        as: "user"
      });
      this.belongsTo(models.Courses, {
        foreignKey: "courseId",
        as: "course"
      });
      this.belongsTo(models.Batches, {
        foreignKey: "batchId",
        as: "batch"
      });
      this.hasMany(models.SurveyAnswers, {
        foreignKey: "alumniId",
        as: "surveys"
      });
    }
  }
 
  UserDetails.init(
    {
      _id: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      uniqueId: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: true,
        autoIncrement: false,
        primaryKey: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      middleName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      birthday: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      suffix: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      gender: {
        type: DataTypes.ENUM('M', 'F'),
        unique: false,
        allowNull: true,
        autoIncrement: false,
        primaryKey: false,
      },
      civilStatus: {
        type: DataTypes.ENUM('SINGLE', 'MARRIED', 'WIDOWED', 'DIVORCED'),
        allowNull: true,
      },
      birthday: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      addressLine1: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      street: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      stateProvinceRegion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      zipCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      mobileNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      graduatedAt: {
        type: DataTypes.DATE,
        unique: false,
        allowNull: true,
        autoIncrement: false,
        primaryKey: false,
      },
      batchId: {
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: true,
        autoIncrement: false,
        primaryKey: false,
      },
      courseId: {
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: true,
        autoIncrement: false,
        primaryKey: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        unique: false,
        allowNull: true,
        autoIncrement: false,
        primaryKey: false,
        defaultValue: true,
      },
      isEmployed: {
        type: DataTypes.BOOLEAN,
        unique: false,
        allowNull: true,
        autoIncrement: false,
        primaryKey: false
      },
      isRelated: {
        type: DataTypes.BOOLEAN,
        unique: false,
        allowNull: true,
        autoIncrement: false,
        primaryKey: false
      },
      city: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: true,
        autoIncrement: false,
        primaryKey: false
      },
      workPosition: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: true,
        autoIncrement: false,
        primaryKey: false
      },
      dateHired: {
        type: DataTypes.DATE,
        unique: false,
        allowNull: true,
        autoIncrement: false,
        primaryKey: false
      },
      workType: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: true,
        autoIncrement: false,
        primaryKey: false
      },
      companyName: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: true,
        autoIncrement: false,
        primaryKey: false
      },
      latinHonors: {
        type: DataTypes.ENUM('CUM_LAUDE', 'MAGNA_CUM_LAUDE', 'SUMMA_CUM_LAUDE'),
        unique: false,
        allowNull: true,
        autoIncrement: false,
        primaryKey: false
      },
      isBoardPasser: {
        type: DataTypes.BOOLEAN,
        unique: false,
        allowNull: true,
        autoIncrement: false,
        primaryKey: false
      },
      prc: {
        type: DataTypes.STRING(10000),
        unique: false,
        allowNull: true,
        autoIncrement: false,
        primaryKey: false
      }
    },
    {
      sequelize,
      modelName: "UserDetails",
    }
  );
 
 
  return UserDetails;
};