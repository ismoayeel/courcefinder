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

Yozilish.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Yozilish, { foreignKey: "userId", onDelete: "CASCADE" });

Yozilish.belongsTo(Yonalish, { foreignKey: "yonalishId" });
Yonalish.hasMany(Yozilish, { foreignKey: "yonalishId", onDelete: "CASCADE" });

export default Yozilish