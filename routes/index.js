import { Router } from "express";
import commentRoute from "./comment.routes.js";
import filialRoute from "./filial.routes.js";
import likedRoute from "./liked.routes.js";
import oquvmarkazRoute from "./oquvMarkaz.routes.js";
import regionRoute from "./region.routes.js";
import userRoute from "./user.routes.js";

const mainRoute = Router()

mainRoute.use("/", commentRoute)
mainRoute.use("/", filialRoute)
mainRoute.use("/", likedRoute)
mainRoute.use("/", oquvmarkazRoute)
mainRoute.use("/", regionRoute)
mainRoute.use('/', userRoute)

export default mainRote