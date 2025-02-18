import express from "express";
import {
  createResursItem,
  deleteResursItem,
  getAllResursItem,
  getOneResursItem,
  updateResursItem,
} from "../controllers/resursItem.controller";

const resursItemRoute = express.Router();

resursItemRoute.post("/resurs-item", createResursItem);
resursItemRoute.get("/resurs-item", getAllResursItem);
resursItemRoute.get("/resurs-item/:id", getOneResursItem);
resursItemRoute.patch("/resurs-item/:id", updateResursItem);
resursItemRoute.delete("/resurs-item/:id", deleteResursItem);

export default resursItemRoute;
