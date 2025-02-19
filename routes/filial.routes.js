import { Router } from "express";
import {
  create,
  findAll,
  findBySearch,
  findOne,
  remove,
  update,
} from "../controllers/filial.controller.js";
import upload from "../config/multer.js";

const filialRoute = Router();

filialRoute.get("/", findAll);
filialRoute.get("/query", findBySearch);
filialRoute.get("/:id", findOne);
filialRoute.post("/", upload.single("image"), create);
filialRoute.patch("/:id", update);
filialRoute.delete("/:id", remove);

export default filialRoute;
