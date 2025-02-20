import express from "express";
import {
  createResurs,
  deleteResurs,
  findBySearchResurs,
  getAllResurs,
  getOneResurs,
  updateResurs,
} from "../controllers/resurs.controller.js";

const resursRoute = express.Router();

resursRoute.post("/", createResurs);
resursRoute.get("/", getAllResurs);
resursRoute.get("/query", findBySearchResurs);
resursRoute.get("/:id", getOneResurs);
resursRoute.patch("/:id", updateResurs);
resursRoute.delete("/:id", deleteResurs);

export default resursRoute;
