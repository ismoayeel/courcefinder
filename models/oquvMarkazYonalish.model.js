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

Oquvmarkaz.belongsToMany(Yonalish, { through: Oquvmarkazyonalish });
Yonalish.belongsToMany(Oquvmarkaz, { through: Oquvmarkazyonalish });


// Oquvmarkazyonalish.belongsTo(Oquvmarkaz, { foreignKey: "oquvMarkazId" });
// Oquvmarkaz.hasMany(Oquvmarkazyonalish, { foreignKey: "oquvMarkazId", onDelete: "CASCADE" });

// Oquvmarkazyonalish.belongsTo(Yonalish, { foreignKey: "yonalishId" });
// Yonalish.hasMany(Oquvmarkazyonalish, { foreignKey: "yonalishId", onDelete: "CASCADE" });

export default Oquvmarkazyonalish