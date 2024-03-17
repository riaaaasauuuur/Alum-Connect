import BaseController from "../utils/BaseController.js";

import Model from "../models/index.js";
const { Courses } = Model.getDb();

export default class CoursesController extends BaseController {
  constructor() {
    super(Courses);
  }

  async create(req) {
    try {
      let data = req.body;
      const isExists = await this.model.findOne({
        $and: [
          { name: { $regex: `.*${data.name}.*` } },
          { code: { $regex: `.*${data.code}.*` } }
        ]
      }).exec();
      if(isExists) throw new Error("Course already exists");
      const result = await this.model.create(data);
      return this.createResponse(result);
    } catch (error) {
      return this.createResponse(null, error);
    }
  }
}
