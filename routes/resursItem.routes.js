import express from "express";
import {
  createResursItem,
  deleteResursItem,
  getAllResursItem,
  getOneResursItem,
  updateResursItem,
} from "../controllers/resursItem.controller.js";

const resursItemRoute = express.Router();

resursItemRoute.post("/", createResursItem);
resursItemRoute.get("/", getAllResursItem);
resursItemRoute.get("/:id", getOneResursItem);
resursItemRoute.patch("/:id", updateResursItem);
resursItemRoute.delete("/:id", deleteResursItem);

export default resursItemRoute;
