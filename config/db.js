import { Sequelize } from "sequelize"

let sequelize = new Sequelize({
    username: "root",
    password: "qosim1207",
    host: "localhost",
<<<<<<< HEAD
    database: "coursefinder",
=======
    database: "courcefinder",
>>>>>>> 660b7329ac5f2fd71b05374bf87a4993204181c2
    dialect: "mysql",
    logging: false
})

export default sequelize