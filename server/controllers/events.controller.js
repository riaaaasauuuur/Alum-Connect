import BaseController from "../utils/BaseController.js";

import Model from "../models/index.js";
import Mixins from "../utils/Mixins.js";
import Mailer from "../utils/Mailer.js";
const { Events, Users } = Model.getDb();

export default class EventsController extends BaseController {
  constructor() {
    super(Events);
  }

  async create(req) {
    try {
      let data = req.body;

      let event = await this.model.create(data);

      let alumni = await (new Users).find({
        $and: [
          { email: { $not: null } },
          { allowedNotifications: { $contains: ["EVENTS"] } },
        ],
        accountType: "ALUMNI"
      }).populate('details').exec();

      for(const x of alumni.rows) {
        const emailData = {
          name: Mixins.getEmployeeName(x.details, true) || 'there',
          title: event.title,
          description: event.description,
          fromTo: `${Mixins.formatDate(event.from)} - ${Mixins.formatDate(event.to)}`
        };
  
        await Mailer.sendEmailV2(
          x.email,
          "EventAnnouncement.html",
          emailData,
          "New Event - PUP AlumConnect"
        );
      }

      return this.createResponse(true);

    } catch (error) {
      return this.createResponse(null, error);
    }
  }

}
