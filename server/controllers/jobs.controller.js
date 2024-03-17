import BaseController from "../utils/BaseController.js";

import Model from "../models/index.js";
import Mailer from "../utils/Mailer.js";
import Mixins from "../utils/Mixins.js";
const { Jobs, Users } = Model.getDb();

export default class JobsController extends BaseController {
  constructor() {
    super(Jobs);
  }

  async create(req) {
    try {
      let data = req.body;

      let job = await this.model.create(data);

      if(data.status !== 'PENDING') {
        await this.notifyUser(job);
      }

      return this.createResponse(true);

    } catch (error) {
      return this.createResponse(null, error);
    }
  }

  async jobAction(req) {
    try {
      let id = req.params.id;
      let data = req.body;

      let job = await this.model.findByIdAndUpdate(id, data, { new: true });

      let posted = await this.model.findById(job._id)
      .populate('createdBy.details')
      .exec();

      if((posted?.createdBy?.allowedNotifications || []).includes('JOBS')) {
        await Mailer.sendEmailV2(
          posted.createdBy.email,
          'JobAction.html',
          {
            name: Mixins.getEmployeeName(posted.createdBy?.details) || 'there',
            message: `Your job posting request with a title of ${job?.title} has been ${data.status === 'ACTIVE' ? 'approved' : 'rejected'}`
          },
          'Job Posting Request Result'
        );
      }

      if(data.status === 'ACTIVE') {
        await this.notifyUser(job);
      }

      return this.createResponse(true);
    } catch (error) {
      return this.createResponse(null, error);
    }
  }

  async notifyUser(job) {
    try {
      let alumni = await (new Users).find({
        $and: [
          { email: { $not: null } },
          { allowedNotifications: { $contains: ["JOBS"] } },
        ],
        accountType: "ALUMNI"
      }).populate('details').exec();

      for(const x of alumni.rows) {
        const emailData = {
          name: Mixins.getEmployeeName(x.details, true) || 'there',
          title: job.title,
          description: job.description,
          company: job.company,
          jobType: job.jobType.split('_').join("-"),
          createdAt: `${Mixins.formatDate(job.createdAt)}`
        };
  
        await Mailer.sendEmailV2(
          x.email,
          "JobAnnouncement.html",
          emailData,
          "New Job Posted - PUP AlumConnect"
        );
      }
      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  }

}
