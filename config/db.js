import { Sequelize } from "sequelize";

let sequelize = new Sequelize({
  username: "root",
  password: "2004",
  host: "localhost",
  database: "coursefinder",
  dialect: "mysql",
  logging: false,
});

export default sequelize;
