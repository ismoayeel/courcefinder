import { Router } from "express";
import { findAll, findBySearch, findOne, create, update, remove } from "../controllers/yozilish.controller.js";

const yozilishRoute = Router()

yozilishRoute.get("/", findAll)
yozilishRoute.get("/", findBySearch)
yozilishRoute.get("/:id", findOne)
yozilishRoute.post("/", create)
yozilishRoute.patch("/:id", update)
yozilishRoute.delete("/:id", remove)

export default yozilishRoute