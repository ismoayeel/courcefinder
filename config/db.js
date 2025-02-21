import { Sequelize } from "sequelize";

let sequelize = new Sequelize({
  host: "localhost",
  password: "ismoayeel",
  username: "root",
  database: "coursefinder",
  dialect: "mysql",
  logging: false,
  timezone: '+5:00',
});

export default sequelize;
