import BaseController from "../utils/BaseController.js";

import Model from "../models/index.js";
const { Memoriam } = Model.getDb();

export default class MemoriamController extends BaseController {
  constructor() {
    super(Memoriam);
  }
}
