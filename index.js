import express from "express"
import dotenv from "dotenv"
import sequelize from "./config/db.js";
import mainRoute from "./routes/index.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

dotenv.config()

const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "OboiShop",
            version: "0.1.0",
            description:
                "This is a simple CRUD API application made with Express and documented with Swagger",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

let app = express()
app.use(express.json())

app.use("/", mainRoute)
app.use("/", swaggerUi.serve, swaggerUi.setup(specs));

let PORT = process.env.PORT

async function bootstrap() {
    try {
        await sequelize.authenticate()
        await sequelize.sync({ force: true })

        console.log("db connected");
        app.listen(PORT, () => {
            console.log(`server started on port: ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

bootstrap()

app.use('/image', express.static('./uploads'));
