import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.model.js";
import Yonalish from "./yonalish.model.js";

let Yozilish = sequelize.define("yozilish", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id"
        }
    },
    yonalishId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Yonalish,
            key: "id"
        }
    },
}, { timestamps: true })

export default Yozilish