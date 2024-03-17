"use strict";

import BaseModel from "../utils/BaseModel.js";

export default (sequelize, DataTypes) => {
  class SurveyQuestionnaires extends BaseModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Surveys, {
        foreignKey: "surveyId",
        as: "survey"
      });
      this.hasMany(models.SurveyQuestionnaireAnswers, {
        foreignKey: "questionId",
        as: "answers"
      });
    }
  }

  SurveyQuestionnaires.init(
    {
      _id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true
      },
      question: {
        type: DataTypes.STRING,
        allowNull: true
      },
      type: {
        type: DataTypes.STRING(10000),
        allowNull: true
      },
      choices: {
        type: DataTypes.JSON,
        allowNull: true
      },
      surveyId: {
        type: DataTypes.INTEGER,
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
      modelName: "SurveyQuestionnaires",
    }
  );


  return SurveyQuestionnaires;
};
