import { Sequelize } from "sequelize";

let sequelize = new Sequelize({
    username: "root",
    password: "qosim1207",
    host: "localhost",
    database: "coursefinder",
    dialect: "mysql",
    logging: false
})

export default sequelize;
