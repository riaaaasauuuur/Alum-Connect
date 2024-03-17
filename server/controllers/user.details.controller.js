import BaseController from "../utils/BaseController.js";
import Mailer from "../utils/Mailer.js";
import Mixins from "../utils/Mixins.js";
import Model from "../models/index.js";
import CSVUploader from "../utils/CSVUploader.js";
import CryptoJS from "crypto-js";
import XLSXPrinter from "../utils/ExcelPrinter.js";
const { UserDetails, Users, Courses, Batches } = Model.getDb();

export default class UserDetailsController extends BaseController {
  constructor() {
    super(UserDetails);
  }

  async create(req) {
    try {
      let data = req.body;

      const isExists = await this.model.findOne({
        uniqueId: data.uniqueId
      }).exec();

      if(isExists) throw new Error("Student already exists");

      const result = await this.model.create(data);      
      return this.createResponse(result);
    } catch (error) {
      return this.createResponse(null, error);
    }
  }
  
  async createAdmin(req) {
    try {
      const data = req.body;
      if(data.password != data.confirmPassword) {
        throw new Error("Password doesn't match");
      }
      const isExist = await (new Users).findOne({ email: data.email }).exec();
      if(isExist) {
        throw new Error("Email already used. Please use different email");
      }

      data.accountType = "ADMIN";
      
      let detail = await this.model.create(data.details);
      data.detailsId = detail._id;
      data.isVerified = true;
      data.temporaryPassword = data.password;
      let user = await (new Users).create(data);

      await this.model.findByIdAndUpdate(detail._id, { userId: user._id });

      return this.createResponse(true);

    } catch (error) {
      return this.createResponse(null, error);
    }
  }

  async verifyAlumni(req) {
    try {
      let data = req.body;

      if(data.password !== data.confirmPassword)
        throw new Error("Password doesn't match");

      const isExist = await (new Users).findOne({
        email: data.email
      }).exec();

      if(isExist) throw new Error("Email already exist");

      if(!data.receiveAnnouncement || !data.consent || !data.dataPrivacy)
        throw new Error("Checkboxes are required");

      let detail = await this.model.findOne({
        uniqueId: data.uniqueId
      }).exec();

      if(!detail) throw new Error("Student ID doesn't exist.")

      if(detail.userId) return this.createResponse({ success: false, message: "Record already exist." });

      let verifyName = await this.model.findOne({
        $and: [
          { firstName: { $regex: `.*${data.firstName}.*` } },
          // { middleName: { $regex: `.*${data.middleName}.*` } },
          { lastName: { $regex: `.*${data.lastName}.*` } }
        ]
      }).exec();

      if(!verifyName) throw new Error("No record found.");

      data.detailsId = verifyName._id;
      data.username = data.uniqueId;
      data.accountType = "ALUMNI";
      data.temporaryPassword = data.password;
      const createUser = await Users.create(data);
      await this.model.findByIdAndUpdate(
        verifyName._id, { userId: createUser._id }, { new: true }
      );

      let encryptedId = CryptoJS.AES.encrypt(JSON.stringify(createUser._id), "d3vsm4rt").toString();
      if(encryptedId.includes("/"))
        encryptedId = encryptedId.split("/").join("~");
      
      console.log('encryptedId :>> ', encryptedId);

      const emailData = {
        verificationURL: (`${process.env.VUE_APP_URL || 'https://pupalumconnect.tech'}/verification?user=${encryptedId}`),
        name: Mixins.ucwords(Mixins.getEmployeeName(verifyName, true).toLowerCase()) || "there" 
      };

      await Mailer.sendEmailV2(
        createUser.email,
        "EmailVerification.html",
        emailData,
        "Email Verification - PUP AlumConnect"
      );

      return this.createResponse({ success: true });
    } catch (error) {
      return this.createResponse(null, error);
    }
  }

  async verifyUser(req) {
    try {
      const { email } = req.body;
      const isExist = await (new Users).findOne({ email }).exec();
      if(isExist) await (new Users).findByIdAndUpdate(isExist._id, { isVerified: true }, { new: true });
      return this.createResponse(true);
    } catch (error) {
      return this.createResponse(null, error);
    }
  }

  async getAlumni(req) {
    try {

      const cond = {
        $not: [
          {
            $or: [
              { firstName: { $regex: ".*ADMIN.*" } },
              { middleName: { $regex: ".*ADMIN.*" } },
              { lastName: { $regex: ".*ADMIN.*" } },
            ]
          }
        ]
      };

      let alumni = await this.model.find({
        $and: [cond, { isActive: true }]
      })
        .populate('course')
        .populate('batch')
        .populate('user')
        .sort({ 'lastName': 1 })
      .exec();

      return this.createResponse(alumni);
    } catch (error) {
      return this.createResponse(null, error);
    }
  }

  async importAlumni(req) {
    try {
      let file = req.files;
      if(!file) throw new Error("There's a problem in the file");
      
      let result = await CSVUploader.process(req);

      const requiredKeys = ['studentId', 'firstName', 'lastName', 'courseTaken', 'batch'];

      // if(result)
      console.log('result :>> ', result);

      let errorCounter = 0;
      let errorFields = [];
      for(let [index, x] of result.entries()) {
        
        requiredKeys.forEach(key => {
          if(!x[key]) errorFields.push(key);
        });
        
        x.uniqueId = x.studentId;

        const isExists = await this.model.findOne({
          uniqueId: x.studentId
        }).exec();

        if(isExists) {
          result.splice(index, 1);
          continue;
        }

        const course = await (new Courses).findOne({
          name: { $regex: `.*${x.courseTaken}.*` }
        }).exec();
        if(course) x.courseId = course._id;

        console.log('course :>> ', course);
        
        const batch = await (new Batches).findOne({
          year: x.batch
        }).exec();
        
        console.log('batch :>> ', batch);

        if(batch) x.batchId = batch._id;

        delete x.studentId;
        delete x.courseTaken;
        delete x.batch;

        if(!x.courseId || !x.batchId) errorCounter++;
        
      }
      const validation = errorFields.map(field => {
        return field.replace(/([A-Z])/g, " $1").charAt(0).toUpperCase() + field.slice(1);
      }).join(', ');
      // console.log('validation :>> ', validation);
      // const finalResult = validation.charAt(0).toUpperCase() + validation.slice(1);
      if(errorFields.length) throw new Error(`Please fill out the missing fields: ${validation}`);
      if(errorCounter) throw new Error("Course/Batch not matched");

      if(result && result.length) {
        await UserDetails.insertMany(result);
      }
      
      return this.createResponse(result);
    } catch (error) {
      return this.createResponse(null, error);
    }
  }

  async downloadAlumni(req) {
    try {

      const { ids, columns } = req.body;

      let alumni = [];
      for(let id of ids) {
        let data = await this.model.findById(id)
          .populate('course')
          .populate('batch')
          .populate('user')
          .sort({ 'lastName': 1 })
        .exec();
        alumni.push(JSON.parse(JSON.stringify(data)));
      }

      const filtered = alumni.filter(x => {
        return !x.user?.accountType || x.user?.accountType !== 'ADMIN';
      });

      const removeFields = columns.filter(x => x.key !== 'action').map(x => x.key === 'uniqueId' ? 'studentId' : x.key);
      console.log('removeFields :>> ', removeFields);
      
      let obj = {};
      for(let i = 0; i < 20; i++) {
        let arr = []
        filtered.forEach(x => {
          let payloads = {
            studentId: x.uniqueId,
            name: Mixins.getEmployeeName(x),
            email: x.user?.email || '',
            birthday: x?.birthday ? Mixins.formatDate(x?.birthday) : '',
            gender: x.gender,
            civilStatus: x.civilStatus,
            street: x.street,
            city: x.city,
            stateProvinceRegion: x?.stateProvinceRegion,
            zipCode: x?.zipCode,
            mobileNumber: x?.mobileNumber,
            course: x.course?.name,
            batch: x.batch?.year,
            graduatedAt: x?.graduatedAt ? Mixins.formatDate(x?.graduatedAt) : '',
            isEmployed: x?.isEmployed === true ? 'Employed' : x?.isEmployed === false ? 'Unemployed' : '',
            workPosition: x?.workPosition,
            dateHired: x?.dateHired ? Mixins.formatDate(x?.dateHired) : '',
            workType: x?.workType,
            companyName: x?.companyName,
            isRelated: x?.isRelated === true ? 'Yes' : x?.isRelated === false ? 'No' : '',
            isBoardPasser: x?.isBoardPasser === true ? 'Yes' : x?.isBoardPasser === false ? 'No' : '',
            latinHonors: x?.latinHonors || '',
            prc: x?.prc || '',
          };

          Object.keys(payloads).forEach(key => {
            if(!removeFields.includes(key)) {
              payloads[key] = '';
            }
          });

          arr.push(payloads)
        })
        obj[`rows${i + 1}`] = arr;
      }

      const result = await XLSXPrinter.print('AlumniListV2', obj);

      // return this.createResponse(true);
      return this.createResponse(result);
    } catch (error) {
      return this.createResponse(null, error);
    }
  }

  async downloadCareer(req) {
    try {

      let filters = {
        batch: { path: 'batch' },
        course: { path: 'course' }
      };

      let associations = [];
      Object.keys(filters).forEach(key => {
        if(req.body[key]) {
          filters[key].where = {
            _id: req.body[key]
          };
        }
        associations.push(filters[key]);
      });

      let alumni = (await this.model.find()
        .populate(['user', ...associations])
        .sort({ 'lastName': 1 })
      .exec()).rows;

      console.log("test :>> ", JSON.parse(JSON.stringify(alumni)));

      const filtered = alumni.filter(x => {
        return !x.user?.accountType || x.user?.accountType !== 'ADMIN';
      });

      let obj = {};
      for(let i = 0; i < 3; i++) {
        let arr = []
        filtered.filter(x => x.isRelated).forEach(x => {
          let payloads = {
            studentId: x.uniqueId,
            name: Mixins.getEmployeeName(x),
            course: x?.course?.name
            // status: x?.isEmployed === true ? 'Employed' : x?.isEmployed === false ? 'Unemployed' : '',
            // dateHired: x?.dateHired ? Mixins.formatDate(x?.dateHired) : ''
          };

          arr.push(payloads)
        })
        obj.rows1 = arr;
      }

      for(let i = 0; i < 3; i++) {
        let arr = []
        filtered.filter(x => x.isRelated === false).forEach(x => {
          let payloads = {
            studentId: x.uniqueId,
            name: Mixins.getEmployeeName(x),
            course: x?.course?.name
            // status: x?.isEmployed === true ? 'Employed' : x?.isEmployed === false ? 'Unemployed' : '',
            // dateHired: x?.dateHired ? Mixins.formatDate(x?.dateHired) : ''
          };

          arr.push(payloads)
        })
        obj.rows2 = arr;
      }

      console.log('obj :>> ', obj);

      if(!(obj.rows1 || []).length && !(obj.rows2 || []).length) throw new Error("No data found");

      const result = await XLSXPrinter.print('CareerRelated', obj, 2);

      return this.createResponse(result);

    } catch (error) {
      return this.createResponse(null, error);
    }
  }

  async downloadStatus(req) {
    try {
      
      let filters = {
        batch: { path: 'batch' },
        course: { path: 'course' }
      };

      let associations = [];
      Object.keys(filters).forEach(key => {
        if(req.body[key]) {
          filters[key].where = {
            _id: req.body[key]
          };
        }
        associations.push(filters[key]);
      });

      let alumni = (await this.model.find()
        .populate(['user', ...associations])
        .sort({ 'lastName': 1 })
      .exec()).rows;

      console.log("test :>> ", JSON.parse(JSON.stringify(alumni)));

      const filtered = alumni.filter(x => {
        return !x.user?.accountType || x.user?.accountType !== 'ADMIN';
      });

      let obj = {};
      for(let i = 0; i < 4; i++) {
        let arr = []
        filtered.filter(x => x.isEmployed).forEach(x => {
          let payloads = {
            studentId: x.uniqueId,
            name: Mixins.getEmployeeName(x),
            status: x?.isEmployed === true ? 'Employed' : x?.isEmployed === false ? 'Unemployed' : '',
            dateHired: x?.dateHired ? Mixins.formatDate(x?.dateHired) : ''
          };

          arr.push(payloads)
        })
        obj.rows1 = arr;
      }

      for(let i = 0; i < 4; i++) {
        let arr = []
        filtered.filter(x => x.isEmployed === false).forEach(x => {
          let payloads = {
            studentId: x.uniqueId,
            name: Mixins.getEmployeeName(x),
            status: x?.isEmployed === true ? 'Employed' : x?.isEmployed === false ? 'Unemployed' : '',
            dateHired: x?.dateHired ? Mixins.formatDate(x?.dateHired) : ''
          };

          arr.push(payloads)
        })
        obj.rows2 = arr;
      }

      console.log('obj :>> ', obj);

      if(!(obj.rows1 || []).length && !(obj.rows2 || []).length) throw new Error("No data found");

      const result = await XLSXPrinter.print('EmployeeStatus', obj, 2);

      return this.createResponse(result);

    } catch (error) {
      return this.createResponse(null, error);
    }
  }

  async getProfile(req) {
    try {
      const _id = req.params.id;
      const data = await (new Users).findOne()
      .populate({
        path: "details",
        where: { _id }
      })
      .exec();
      return this.createResponse(data);
    } catch (error) {
      return this.createResponse(null, error);
    }
  }

  async updateProfile(req) {
    try {
      let _id = req.params.id;
      await this.model.findByIdAndUpdate(_id, (req.body.details || req.body), { new: true });
      return this.createResponse(true);
    } catch (error) {
      return this.createResponse(null, error);
    }
  }

  async getCountByBatch(req){
    try {
      console.log('true :>> ', true);
      let batches = (await new Batches).find().exec()
      batches = batches.rows.length ? batches.sort((a,b) => a - b) : []
      let response = await this.model.find().populate('user').populate('batch').exec()
      let batchesCount = []
      if((response.rows || []).length)
      for(let batch of batches){
        let count = response.rows.filter(v => v.batchId == batch._id).length
        batchesCount.push({ year: batches.year, count})
      }
      console.log('batchesCount :>> ', batchesCount);
      return this.createResponse(batchesCount)
    } catch (error) {
      return this.createResponse(null, error)
    }
  }
  
}
