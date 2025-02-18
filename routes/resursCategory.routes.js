import express from "express";
import {
  createResursCategoriy,
  deleteResursCategoriy,
  getAllResursCategoriy,
  getOneResursCategoriy,
  updateResursCategoriy,
} from "../controllers/resursCategory.controller.js";

const resursCategoryRoute = express.Router();

resursCategoryRoute.post("/resurs-category", createResursCategoriy);
resursCategoryRoute.get("/resurs-category", getAllResursCategoriy);
resursCategoryRoute.get("/resurs-category/:id", getOneResursCategoriy);
resursCategoryRoute.patch("/resurs-category/:id", updateResursCategoriy);
resursCategoryRoute.delete("/resurs-category/:id", deleteResursCategoriy);

export default resursCategoryRoute;
