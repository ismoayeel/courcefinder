import { Router } from "express";
import { create, findAll, findBySearch, findOne, remove, update } from "../controllers/filial.controller.js";
import upload from "../config/multer.js";

const filialRoute = Router()

filialRoute.get("/filial", findAll)
filialRoute.get("/filial", findBySearch)
filialRoute.get("/filial/:id", findOne)
filialRoute.post("/filial", upload.single("image"), create)
filialRoute.patch("/filial/:id", update)
filialRoute.delete("/filial/:id", remove)

export default filialRoute