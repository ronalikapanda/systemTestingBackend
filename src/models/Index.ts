import { Sequelize } from "sequelize-typescript";
import dbConfig from '../config/database'
import Customer from "./Customer";
import Tasks from "./Task";

const connection = new Sequelize({
  dialect: "mysql",
  host: dbConfig.HOST,
  username: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  logging: false,
  models: [Customer,Tasks],
});

export default connection;
