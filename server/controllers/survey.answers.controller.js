import BaseController from "../utils/BaseController.js";

import Model from "../models/index.js";
const { SurveyAnswers, SurveyQuestionnaireAnswers } = Model.getDb();

export default class SurveyAnswersController extends BaseController {
  constructor() {
    super(SurveyAnswers);
  }

  async create(req) {
    try {
      let data = req.body;
      data.alumniId = req.user.details._id;

      // check if already answered
      let isAnswered = await this.model.findOne({
        surveyId: data.surveyId,
        alumniId: req.user.details._id
      }).exec();

      if(isAnswered) throw new Error("You already answered this survey");

      let answer = await this.model.create(data);

      data.answers.forEach(e => {
        e.surveyAnswerId = answer._id;
      });
      
      await SurveyQuestionnaireAnswers.insertMany(data.answers);

      return this.createResponse(true);
    } catch (error) {
      return this.createResponse(null, error);
    }
  }

}
