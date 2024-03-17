import BaseController from "../utils/BaseController.js";
import Model from "../models/index.js";
const { Users } = Model.getDb();
const UserModel = new Users();
import jwt from "jsonwebtoken";
import ApplicationSettings from "../utils/ApplicationSettings.js";
import Mailer from "../utils/Mailer.js";
import Constants from "../utils/Constants.js";

export default class AuthController extends BaseController {
  async forgotPassword(req) {
    try {
      if (!req.body.username) throw new Error("Username is required.");
      let user = await UserModel.findOne({ username: req.body.username })
        .populate("details")
        .exec();
      if (!user) throw new Error("User not found.");
      if (!user.isActive) throw new Error("User is deactivated");
      let expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 1);
      const passwordResetToken = jwt.sign(
        {
          userId: user._id,
          expirationDate,
        },
        ApplicationSettings.getValue("JWT_SECRET_TOKEN")
      );
      await UserModel.findByIdAndUpdate(user._id, { passwordResetToken });
      let emailData = {
        name: user.username,
        link:
          `${ApplicationSettings.getValue(
            "VUE_APP_HOME_URL"
          )}resetpassword?access_token=` + passwordResetToken,
      };

      let email =
        user.accountType && user.accountType.toUpperCase() == "STUDENT"
          ? user.student.email || ""
          : user.employee.email || "";

      let result = await Mailer.sendEmailV2(
        email,
        "ChangePassword.html",
        emailData,
        "Forgot Password"
      );

      return this.createResponse({
        success: true,
        message: `New password has been sent to your registered email!`,
      });
    } catch (error) {
      return this.createResponse(null, error);
    }
  }

  async setPassword(req) {
    try {
      // validate password
      let passwordResetToken = req.params.token,
        newPassword = req.body.data.password;
      if (!Constants.password_regex.test(newPassword))
        throw new Error(Constants.not_match_password_message);

      // check token expiration
      try {
        let decoded = jwt.verify(
          passwordResetToken,
          ApplicationSettings.getValue("JWT_SECRET_TOKEN")
        );
        if (
          !decoded ||
          !decoded.expirationDate ||
          new Date(decoded.expirationDate) < new Date()
        )
          throw new Error("Invalid Token");
      } catch (error) {
        throw new Error("Invalid Token");
      }

      let user = await UserModel.findOne({ passwordResetToken })
        .populate("employee")
        .populate("student")
        .exec();
      if (!user) throw new Error("Invalid Token");
      if (!user.isActive) throw new Error("User is deactivated");

      //check if new password is the same as old password
      let isValid = await user.isValid(newPassword);
      if (isValid)
        throw new Error("Your new password cannot be same as old password.");

      // update password
      let password = user.encryptPassword(newPassword);
      await UserModel.findByIdAndUpdate(user._id, {
        password,
        passwordResetToken: null,
      });

      return this.createResponse({ success: true });
    } catch (error) {
      return this.createResponse(null, error);
    }
  }
}
