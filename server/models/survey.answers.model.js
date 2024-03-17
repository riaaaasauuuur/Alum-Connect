"use strict";

import BaseModel from "../utils/BaseModel.js";

export default (sequelize, DataTypes) => {
  class SurveyAnswers extends BaseModel {
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
      this.belongsTo(models.UserDetails, {
        foreignKey: "alumniId",
        as: "alumni"
      });
      this.hasMany(models.SurveyQuestionnaireAnswers, {
        foreignKey: "surveyAnswerId",
        as: "surveyQuestionnaireAnswers"
      });
    }
  }

  SurveyAnswers.init(
    {
      _id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true
      },
      surveyId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      alumniId: {
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
      modelName: "SurveyAnswers",
    }
  );


  return SurveyAnswers;
};
