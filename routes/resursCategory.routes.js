import express from "express";
import {
  createResursCategoriy,
  deleteResursCategoriy,
  getAllResursCategoriy,
  getOneResursCategoriy,
  updateResursCategoriy,
} from "../controllers/resursCategory.controller.js";

const resursCategoryRoute = express.Router();

resursCategoryRoute.post("/", createResursCategoriy);
resursCategoryRoute.get("/", getAllResursCategoriy);
resursCategoryRoute.get("/:id", getOneResursCategoriy);
resursCategoryRoute.patch("/:id", updateResursCategoriy);
resursCategoryRoute.delete("/:id", deleteResursCategoriy);

export default resursCategoryRoute;
