import BaseController from "../utils/BaseController.js";

import Model from "../models/index.js";
const { Users } = Model.getDb();
import jwt from 'jsonwebtoken';
import ApplicationSettings from '../utils/ApplicationSettings.js';
import Mailer from '../utils/Mailer.js';

export default class UserController extends BaseController {
  constructor() {
    super(Users);
  }

  /**
   * @description Create single record
   * @param {HttpRequest} req
   * @returns {Object} response
   */
  async create(req) {
    try {
      let data = req.body;
      if (req.user) data.createdById = req.user._id;

      // valid if the student or employee has user
      let { employeeId, studentId, username } = data;
      let query = {};
      if (employeeId) {
        query.employeeId = employeeId;
      } else {
        query.studentId = studentId;
      }

      let exists = await this.model.findOne(query).exec();

      if (exists) {
        throw new Error("Selected employee/student has existing user.");
      }

      exists = await this.model.findOne({ username }).exec();

      if (exists) {
        throw new Error("Username is already in used.");
      }

      let results = await this.model.create(data);

      return this.createResponse(results);
    } catch (error) {
      return this.createResponse(null, error);
    }
  }

  getUser(req) {
    return this.createResponse(req.user);
  }

  async updatePassword(req) {
    try {
      
      let user = await this.model.findById(req.params.id).exec();

      let isValid = await user.isValid(req.body.oldPassword);

      if(!isValid) {
        return this.createResponse({
          message: "Invalid Credentials"
        });
      }

      if(req.body.oldPassword == req.body.password) {
        return this.createResponse({
          message: "Your new password cannot be same as old password."
        });
      }

      let password = user.encryptPassword(req.body.password);

      await this.model.findByIdAndUpdate(req.params.id, { password });

      return this.createResponse({ success: true });
    } catch (error) {
      return this.createResponse(error);
    }
  }

  async addNotificationTokens({ params, body }) {
    try {
      let { id: userId } = params;
      let { notificationTokens } = body;
      let results = await this.model.findOneAndUpdate(
        { _id: userId },
        { notificationTokens },
        { new: true }
      );
      return this.createResponse(results);
    } catch (error) {
      return this.createResponse(null, error);
    }
  }

  async unlockUser(req) {
    try {
      let result = await this.model.findByIdAndUpdate(req.params.id, {
        loginAttempts: 0,
        lockedDate: null,
      });

      return this.createResponse({ success: true });
    } catch (error) {
      return this.createResponse(null, error);
    }
  }

  async resetUserPassword(req) {
    try {
      let user = await this.model.findById(req.params.id)
        .populate('details').populate('student').exec();
      if (!user) throw new Error('User not found.');

      let expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 1);
      const passwordResetToken = jwt.sign({
        userId: user._id,
        expirationDate
      }, ApplicationSettings.getValue('JWT_SECRET_TOKEN'));
      await this.model.findByIdAndUpdate(user._id, { passwordResetToken });
      let emailData = {
        name: user.username,
        link: `${ApplicationSettings.getValue('VUE_APP_HOME_URL')}resetpassword?access_token=` + passwordResetToken
      }


      let email = user.accountType && user.accountType.toUpperCase() == 'STUDENT' ? user.student.email || "" : user.employee.email || ""


      let result = await Mailer.sendEmailV2(email, 'ChangePassword.html', emailData, "Reset Password");


      return this.createResponse({ success: true });
    } catch (error) {
      return this.createResponse(null, error);
    }
  }
}
