import { Router } from "express";
import { create, findAll, findBySearch, findOne, remove } from "../controllers/liked.controller.js";

const likedRoute = Router()

likedRoute.get("/liked", findAll)
likedRoute.get("/liked", findBySearch)
likedRoute.get("/liked/:id", findOne)
likedRoute.post("/liked", create)
likedRoute.delete("/liked/:id", remove)

export default likedRoute