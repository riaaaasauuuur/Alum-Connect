import BaseController from "../utils/BaseController.js";

import Model from "../models/index.js";
const { Batches } = Model.getDb();

export default class BatchesController extends BaseController {
  constructor() {
    super(Batches);
  }

  async create(req) {
    try {
      let data = req.body;
      const isExists = await this.model.findOne({
        year: data.year
      }).exec();
      if(isExists) throw new Error("Batch already exists");
      const result = await this.model.create(data);
      return this.createResponse(result);
    } catch (error) {
      return this.createResponse(null, error);
    }
  }

}
