import BaseController from "../utils/BaseController.js";

import Model from "../models/index.js";
const { Achievements } = Model.getDb();

export default class AchievementsController extends BaseController {
  constructor() {
    super(Achievements);
  }
}
