import { Router } from "express";
import { create, findAll, findBySearch, findOne, remove } from "../controllers/comment.controller.js";

const commentRoute = Router()

commentRoute.get("/comment", findAll)
commentRoute.get("/comment", findBySearch)
commentRoute.get("/comment/:id", findOne)
commentRoute.post("/comment", create)
commentRoute.delete("/comment/:id", remove)

export default commentRoute