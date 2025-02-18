import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Region from "./region.model.js";
import User from "./user.model.js";
import Filial from "./filial.model.js";
import Comment from "./comment.model.js";
import Liked from "./liked.model.js";

let Oquvmarkaz = sequelize.define("oquvmarkazs", {
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
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    filialSoni: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    regionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Region,
            key: "id"
        }
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: true })

Oquvmarkaz.belongsTo(User, { foreignKey: "userId" });
Oquvmarkaz.belongsTo(Region, { foreignKey: "regionId" });
Oquvmarkaz.hasMany(Filial, { foreignKey: "oquvMarkazId", onDelete: "CASCADE" });
Oquvmarkaz.hasMany(Comment, { foreignKey: "oquvMarkazId", onDelete: "CASCADE" });
Oquvmarkaz.hasMany(Liked, { foreignKey: "oquvMarkazId", onDelete: "CASCADE" });

export default Oquvmarkaz