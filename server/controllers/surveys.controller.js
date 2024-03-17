import BaseController from "../utils/BaseController.js";
import Mailer from "../utils/Mailer.js";
import Mixins from "../utils/Mixins.js";
import Model from "../models/index.js";
const { Surveys, SurveyQuestionnaires, Users } = Model.getDb();

export default class SurveysController extends BaseController {
  constructor() {
    super(Surveys);
  }

  async create(req) {
    try {
      let data = req.body;

      let survey = await this.model.create(data);
      data.questionnaires.forEach(questionnaire => {
        questionnaire.surveyId = survey._id;
      });

      await SurveyQuestionnaires.insertMany(data.questionnaires);

      // get all registered alumni
      let alumni = await (new Users).find({
        email: { $not: null },
        accountType: "ALUMNI",
        allowedNotifications: { $contains: ["SURVEYS"] }
      }).populate('details').exec();

      for(const x of alumni.rows) {
        const emailData = {
          name: Mixins.getEmployeeName(x.details, true) || 'there',
          title: data.title,
          description: data.description,
          validity: Mixins.formatDate(data.expiryDate)
        };
  
        await Mailer.sendEmailV2(
          x.email,
          "SurveyAnnouncement.html",
          emailData,
          "New Survey Posted - PUP AlumConnect"
        );
      }
      return this.createResponse(true);
    } catch (error) {
      return this.createResponse(null, error);
    }
  }

  async getById(req) {
    try {
      let id = req.params.id;
      const data = await this.model.findById(id).populate('questionnaires').exec();
      return this.createResponse(data);
    } catch (error) {
      return thix.createResponse(null, error);
    }
  }

}
