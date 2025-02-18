import { Router } from "express";
import { findAll, findBySearch, findOne, create, update, remove } from "../controllers/oquvmarkazYonalish.controller.js";

const oquvMarkazYonalishRoute = Router()

oquvMarkazYonalishRoute.get("/", findAll)
oquvMarkazYonalishRoute.get("/", findBySearch)
oquvMarkazYonalishRoute.get("/:id", findOne)
oquvMarkazYonalishRoute.post("/", create)
oquvMarkazYonalishRoute.patch("/:id", update)
oquvMarkazYonalishRoute.delete("/:id", remove)

export default oquvMarkazYonalishRoute