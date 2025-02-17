import { Router } from "express";
import { create, findAll, findBySearch, findOne, remove, update } from "../controllers/oquvMarkaz.controller.js";

const oquvmarkazRoute = Router()

oquvmarkazRoute.get("/oquvmarkaz", findAll)
oquvmarkazRoute.get("/oquvmarkaz", findBySearch)
oquvmarkazRoute.get("/oquvmarkaz/:id", findOne)
oquvmarkazRoute.post("/oquvmarkaz", create)
oquvmarkazRoute.patch("/oquvmarkaz/:id", update)
oquvmarkazRoute.delete("/oquvmarkaz/:id", remove)

export default oquvmarkazRoute 