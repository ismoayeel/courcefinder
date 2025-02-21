import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import resursCategory from "./resursCategory.model.js";
import Resurs from "./resurs.model.js";

let resursItem = sequelize.define(
  "resursitem",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    resursId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "resurs",
        key: "id",
      }
    },
    resursCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "resurscategory",
        key: "id",
      }
    }
  },
  { timestamps: true }
);

// Resurs.belongsToMany(resursCategory, { through: resursItem, foreignKey: "resursId" });
// resursCategory.belongsToMany(Resurs, { through: resursItem, foreignKey: "resursCategoryId" });

// // Yangi bog'lanish: resurs va resursitem o'rtasidagi bog'lanish
// Resurs.hasMany(resursItem, { foreignKey: 'resursId' });
// resursItem.belongsTo(Resurs, { foreignKey: 'resursId' });

resursItem.associate = () => {
  // Resurs va resursItem o'rtasidagi bog'lanish
  Resurs.hasMany(resursItem, { foreignKey: "resursId" });
  resursItem.belongsTo(Resurs, { foreignKey: "resursId" });

  // ResursCategory va resursItem o'rtasidagi bog'lanish
  resursCategory.hasMany(resursItem, { foreignKey: "resursCategoryId" });
  resursItem.belongsTo(resursCategory, { foreignKey: "resursCategoryId" });
};

export default resursItem;