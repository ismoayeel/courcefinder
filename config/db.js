import { Sequelize } from "sequelize"

let sequelize = new Sequelize({
    username: "root",
    password: "ismoayeel",
    host: "localhost",
    database: "courcefinder",
    dialect: "mysql",
    logging: false
})

export default sequelize