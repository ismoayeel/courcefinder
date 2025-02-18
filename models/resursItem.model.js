import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Resurs from "./resurs.model.js";
import resursCategory from "./resursCategory.model.js";

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
        model: Resurs,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    resursCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: resursCategory,
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  { timestamps: true }
);

export default resursItem;
