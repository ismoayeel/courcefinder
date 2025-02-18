import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Region from "./region.model.js";
import User from "./user.model.js";

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
User.hasMany(Oquvmarkaz, { foreignKey: "userId", onDelete: "CASCADE" });

Oquvmarkaz.belongsTo(Region, { foreignKey: "regionId" });
Region.hasMany(Oquvmarkaz, { foreignKey: "regionId" })

export default Oquvmarkaz