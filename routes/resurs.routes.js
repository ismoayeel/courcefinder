import express from "express";
import {
  createResurs,
  deleteResurs,
  getAllResurs,
  getOneResurs,
  updateResurs,
} from "../controllers/resurs.controller.js";

const resursRoute = express.Router();

resursRoute.post("/resurs", createResurs);
resursRoute.get("/resurs", getAllResurs);
resursRoute.get("/resurs/:id", getOneResurs);
resursRoute.patch("/resurs/:id", updateResurs);
resursRoute.delete("/resurs/:id", deleteResurs);

export default resursRoute;
