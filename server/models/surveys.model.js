"use strict";

import BaseModel from "../utils/BaseModel.js";

export default (sequelize, DataTypes) => {
  class Surveys extends BaseModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.SurveyQuestionnaires, {
        foreignKey: "surveyId",
        as: "questionnaires"
      });
      this.hasMany(models.SurveyAnswers, {
        foreignKey: 'surveyId',
        as: 'surveyAnswers',
      });
    }
  }

  Surveys.init(
    {
      _id: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        unique: false,
        allowNull: true,
        autoIncrement: false,
        primaryKey: false,
        defaultValue: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true
      },
      description: {
        type: DataTypes.STRING(10000),
        allowNull: true
      },
      expiryDate: {
        type: DataTypes.DATE,
        allowNull: true
      },
      createdById: {
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: true,
        autoIncrement: false,
        primaryKey: false,
      },
      modifiedById: {
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: true,
        autoIncrement: false,
        primaryKey: false,
      },
    },
    {
      sequelize,
      modelName: "Surveys",
    }
  );


  return Surveys;
};
