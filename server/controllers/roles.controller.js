import BaseController from "../utils/BaseController.js";

import Model from "../models/index.js";
const { Roles } = Model.getDb();

export default class RolesController extends BaseController {
  constructor() {
    super(Roles);
  }
}
