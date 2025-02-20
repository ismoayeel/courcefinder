import { Router } from "express";
import {
  create,
  findAll,
  findBySearch,
  findOne,
  remove,
} from "../controllers/liked.controller.js";

const likedRoute = Router();

likedRoute.get("/", findAll);
likedRoute.get("/query", findBySearch);
likedRoute.get("/:id", findOne);
likedRoute.post("/", create);
likedRoute.delete("/:id", remove);

export default likedRoute;
