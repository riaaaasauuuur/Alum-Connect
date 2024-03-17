import BaseController from "../utils/BaseController.js";

import Model from "../models/index.js";
import Mailer from "../utils/Mailer.js";
import Mixins from "../utils/Mixins.js";
const { Donations, Users } = Model.getDb();

export default class DonationsController extends BaseController {
  constructor() {
    super(Donations);
  }

  async create(req) {
    try {
      let data = req.body;

      let donation = await this.model.create(data);

      let alumni = await (new Users).find({
        $and: [
          { email: { $not: null } },
          { allowedNotifications: { $contains: ["DONATIONS"] } },
        ],
        accountType: "ALUMNI"
      }).populate('details').exec();

      for(const x of alumni.rows) {
        const emailData = {
          name: Mixins.getEmployeeName(x.details, true) || 'there',
          title: donation.title,
          description: donation.description,
          fromTo: `${Mixins.formatDate(donation.from)} - ${Mixins.formatDate(donation.to)}`
        };
  
        await Mailer.sendEmailV2(
          x.email,
          "DonationAnnouncement.html",
          emailData,
          "New Donation - PUP AlumConnect"
        );
      }

      return this.createResponse(true);

    } catch (error) {
      return this.createResponse(null, error);
    }
  }

}
