import dotenv from "dotenv";
dotenv.config();

export default {
  development: {
    username: process.env.DEV_DB_USERNAME || "root",
    password: process.env.DEV_DB_PASSWORD || "Wzpx3RgJ9fRKWZKyNEa7OLZpKEHi4eB5",
    database: process.env.DEV_DB_NAME || "pup_db",
    host: process.env.DEV_DB_HOSTNAME || "dpg-cm3ouji1hbls73a8l160-a.singapore-postgres.render.com",
    port: process.env.DEV_DB_PORT || 5432,
    dialect: process.env.DEV_DB_DIALECT || "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    schema: process.env.DEV_DB_SCHEMA || "public",
    logging: false
  },
  production: {
    username: process.env.PRODUCTION_DB_USERNAME,
    password: process.env.PRODUCTION_DB_PASSWORD,
    database: process.env.PRODUCTION_DB_NAME,
    host: process.env.PRODUCTION_DB_HOSTNAME,
    port: process.env.PRODUCTION_DB_PORT,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    dialect: "postgres",
    logging: false,
  },
};
