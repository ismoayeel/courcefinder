import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Liked from "./liked.model.js";
import Comment from "./comment.model.js";
import Oquvmarkaz from "./oquvMarkaz.model.js";

let User = sequelize.define("user", {
    fullname: {
        type: DataTypes.STRING,
        allowNull: false
    },

    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM("user", "seo", "admin"),
        allowNull: false
    }
}, { timestamps: true })

User.hasMany(Oquvmarkaz, { foreignKey: "userId", onDelete: "CASCADE" });
User.hasMany(Comment, { foreignKey: "userId", onDelete: "CASCADE" });
User.hasMany(Liked, { foreignKey: "userId", onDelete: "CASCADE" });

export default User