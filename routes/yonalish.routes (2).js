import { Router } from "express";
import {
  findAll,
  findBySearch,
  findOne,
  create,
  update,
  remove,
} from "../controllers/yonalish.controller.js";

const yonalishRoute = Router();

yonalishRoute.get("/", findAll);
yonalishRoute.get("/query", findBySearch);
yonalishRoute.get("/:id", findOne);
yonalishRoute.post("/", create);
yonalishRoute.patch("/:id", update);
yonalishRoute.delete("/:id", remove);

export default yonalishRoute;
