"use strict";

import BaseModel from "../utils/BaseModel.js";

export default (sequelize, DataTypes) => {
  class SurveyQuestionnaireAnswers extends BaseModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.SurveyQuestionnaires, {
        foreignKey: "questionId",
        as: "question"
      });
      this.belongsTo(models.SurveyAnswers, {
        foreignKey: "surveyAnswerId",
        as: "surveyAnswer"
      });
    }
  }

  SurveyQuestionnaireAnswers.init(
    {
      _id: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      questionId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      surveyAnswerId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      answer: {
        type: DataTypes.JSON,
        allowNull: true
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
      modelName: "SurveyQuestionnaireAnswers",
    }
  );


  return SurveyQuestionnaireAnswers;
};
