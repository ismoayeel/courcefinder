import { Router } from "express";
import { create, findAll, findBySearch, findOne, remove, update } from "../controllers/oquvMarkaz.controller.js";

const oquvmarkazRoute = Router()

oquvmarkazRoute.get("/", findAll)
oquvmarkazRoute.get("/", findBySearch)
oquvmarkazRoute.get("/:id", findOne)
oquvmarkazRoute.post("/", create)
oquvmarkazRoute.patch("/:id", update)
oquvmarkazRoute.delete("/:id", remove)

export default oquvmarkazRoute 