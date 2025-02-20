import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Yonalish from "./yonalish.model.js";
import Oquvmarkaz from "./oquvMarkaz.model.js";

let Oquvmarkazyonalish = sequelize.define("oquvmarkazyonalish", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    oquvMarkazId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Oquvmarkaz,
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

Yonalish.belongsToMany(Oquvmarkaz, { through: Oquvmarkazyonalish, foreignKey: "yonalishId" });
Oquvmarkaz.belongsToMany(Yonalish, { through: Oquvmarkazyonalish, foreignKey: "oquvMarkazId" });

export default Oquvmarkazyonalish