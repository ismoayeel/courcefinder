import { Router } from "express";
import {
  create,
  findAll,
  findBySearch,
  findOne,
  remove,
} from "../controllers/comment.controller.js";

const commentRoute = Router();

commentRoute.get("/", findAll);
commentRoute.get("/query", findBySearch);
commentRoute.get("/:id", findOne);
commentRoute.post("/", create);
commentRoute.delete("/:id", remove);

export default commentRoute;
