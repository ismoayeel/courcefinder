import { DataTypes, STRING } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.model.js";
import resursCategory from "./resursCategory.model.js";
import resursItem from "./resursItem.model.js";

let Resurs = sequelize.define(
  "resurs",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
      allowNull: false,
    },
    media: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

User.hasMany(Resurs, { foreignKey: "userId" });
Resurs.belongsTo(User, { foreignKey: "userId" });

// Many-to-many bog'lanish (Resurs va ResursCategory)
// Resurs.belongsToMany(resursCategory, { through: resursItem });
// resursCategory.belongsToMany(Resurs, { through: resursItem });

export default Resurs;
