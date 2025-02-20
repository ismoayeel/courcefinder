import express from "express";
import {
  createResursCategoriy,
  deleteResursCategoriy,
  findBySearchResursCategory,
  getAllResursCategoriy,
  getOneResursCategoriy,
  updateResursCategoriy,
} from "../controllers/resursCategory.controller.js";

const resursCategoryRoute = express.Router();

resursCategoryRoute.post("/", createResursCategoriy);
resursCategoryRoute.get("/", getAllResursCategoriy);
resursCategoryRoute.post("/query", findBySearchResursCategory);
resursCategoryRoute.get("/:id", getOneResursCategoriy);
resursCategoryRoute.patch("/:id", updateResursCategoriy);
resursCategoryRoute.delete("/:id", deleteResursCategoriy);

export default resursCategoryRoute;
