import { Router } from "express";
import {
  create,
  findAll,
  findBySearch,
  findOne,
  remove,
  update,
} from "../controllers/sohafan.controller.js";

const sohaFanRoutes = Router();

sohaFanRoutes.get("/", findAll);
sohaFanRoutes.get("/", findBySearch);
sohaFanRoutes.get("/:id", findOne);
sohaFanRoutes.post("/", create);
sohaFanRoutes.patch("/:id", update);
sohaFanRoutes.delete("/:id", remove);

export default sohaFanRoutes;
