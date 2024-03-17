import BaseController from "../utils/BaseController.js";
import Mailer from "../utils/Mailer.js";
import Model from "../models/index.js";
const { Concerns } = Model.getDb();

export default class ConcernsController extends BaseController {
  constructor() {
    super(Concerns);
  }

  async reply(req) {
    try {
      let data = req.body;

      const emailData = {
        name: data.name || "there",
        message: data.reply
      };

      await Mailer.sendEmailV2(
        data.email,
        "ReplyConcern.html",
        emailData,
        "Customer Concern - PUP AlumConnect"
      );

      return this.createResponse(true);
    } catch (error) {
      return this.createResponse(null, error);
    }
  }

}
