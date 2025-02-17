import { Router } from "express";
import { create, findAll, findBySearch, findOne, remove, update } from "../controllers/region.controller.js";

const regionRoute = Router()

regionRoute.get("/region", findAll)
regionRoute.get("/region", findBySearch)
regionRoute.get("/region/:id", findOne)
regionRoute.post("/region", create)
regionRoute.patch("/region/:id", update)
regionRoute.delete("/region/:id", remove)

export default regionRoute