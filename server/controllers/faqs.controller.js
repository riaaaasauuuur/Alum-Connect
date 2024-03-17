import BaseController from "../utils/BaseController.js";

import Model from "../models/index.js";
const { Faqs } = Model.getDb();

export default class FaqsController extends BaseController {
  constructor() {
    super(Faqs);
  }
}
