import { Router } from "express";
import commentRoute from "./comment.routes.js";
import filialRoute from "./filial.routes.js";
import likedRoute from "./liked.routes.js";
import oquvmarkazRoute from "./oquvMarkaz.routes.js";
import regionRoute from "./region.routes.js";
import userRoute from "./user.routes.js";
import sohaFanRoutes from "./sohaFan.routes.js";
import resursRoute from "./resurs.routes.js";
import resursCategoryRoute from "./resursCategory.routes.js";
import resursItemRoute from "./resursItem.routes.js";

const mainRoute = Router();

mainRoute.use("/comment", commentRoute);
mainRoute.use("/filial", filialRoute);
mainRoute.use("/liked", likedRoute);
mainRoute.use("/oquvmarkaz", oquvmarkazRoute);
mainRoute.use("/region", regionRoute);
mainRoute.use("/user", userRoute);
mainRoute.use("/sohafan", sohaFanRoutes);
mainRoute.use("/resurs", resursRoute);
mainRoute.use("/resurscategory", resursCategoryRoute);
mainRoute.use("/resursitem", resursItemRoute);

export default mainRoute;
