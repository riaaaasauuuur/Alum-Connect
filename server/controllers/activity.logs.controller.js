import BaseController from "../utils/BaseController.js";

import Model from "../models/index.js";
const { ActivityLogs } = Model.getDb();

export default class ActivityLogsController extends BaseController {
  constructor() {
    super(ActivityLogs);
  }
}
