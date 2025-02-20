import { ConnectionTimedOutError, Sequelize } from "sequelize";

let sequelize = new Sequelize({
  host: "localhost",
  password: "ismoayeel",
  username: "root",
  database: "coursefinder",
  dialect: "mysql",
  logging: false
});

export default sequelize;
