import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import enVariables from '../config/db.config.js';


import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = enVariables[env];
// console.log('config :>> ', config);
let db = {};

export default class DatabaseService {
  static async init() {
    let sequelize;
    if (config.use_env_variable) {
      sequelize = new Sequelize(process.env[config.use_env_variable], config);
    } else {
      sequelize = new Sequelize(config.database, config.username, config.password, config);
    }
    const files = fs
      .readdirSync(__dirname)
      .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'));

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // eslint-disable-next-line global-require,import/no-dynamic-require
      const model = (await import('./' + file)).default(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    }

    Object.keys(db).forEach(modelName => {
      if (db[modelName].associate) {
        db[modelName].associate(db);

        // Set common association
        // console.log('db[modelName] :>> ', db[modelName].rawAttributes);
        // if (db[modelName].rawAttributes) {
        //   if (db[modelName].rawAttributes.createdById)
        //     db[modelName].belongsTo(db.Users, {
        //       foreignKey: 'createdById',
        //       as: 'createdBy'
        //     });

        //   if (db[modelName].rawAttributes.modifiedById)
        //     db[modelName].belongsTo(db.Users, {
        //       foreignKey: 'modifiedById',
        //       as: 'modifiedBy'
        //     });
        // }

        db[modelName].setAssociations(db[modelName].associations);
      }
    });
    try {
      // await sequelize.sync();
    // await db['Surveys'].sync({force:true})
    } catch (error) {
      console.error(error);
    }
    db.sequelize = sequelize;
    db.Sequelize = Sequelize;
    return db;
  }

  static getDb() {
    return db;
  }

};