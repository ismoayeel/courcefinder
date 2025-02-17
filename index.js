import express from "express"
import dotenv from "dotenv"
import sequelize from "./config/db.js";
import mainRote from "./routes/index.js";

dotenv.config()

let app = express()
app.use(express.json())

let PORT = process.env.PORT

app.use('/api', mainRote)

async function bootstrap() {
    try {
<<<<<<< HEAD
        // await sequelize.authenticate()
        await sequelize.sync({force:true})
=======
        await sequelize.authenticate()
        await sequelize.sync({ force: true })
>>>>>>> 9a31a9a70e98411a13b6259a2c07dfcea55ef28f
        console.log("db connected");
        app.listen(PORT, () => {
            console.log(`server started on port: ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

bootstrap()