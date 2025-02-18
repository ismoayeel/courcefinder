import { Router } from "express";
import commentRoute from "./comment.routes.js";
import filialRoute from "./filial.routes.js";
import likedRoute from "./liked.routes.js";
import oquvmarkazRoute from "./oquvMarkaz.routes.js";
import regionRoute from "./region.routes.js";
import userRoute from "./user.routes.js";
import yozilishRoute from "./yozilish.routes.js";
import yonalishRoute from "./yonalish.routes.js";
import oquvMarkazYonalishRoute from "./oquvmarkazyonalish.routes.js";
import uploadRoute from "./upload.routes.js";
import resursRoute from "./resurs.routes.js";
import resursCategoryRoute from "./resursCategory.routes.js";
import resursItemRoute from "./resursItem.routes.js";

const mainRoute = Router()

mainRoute.use('/user', userRoute)
mainRoute.use("/comment", commentRoute)
mainRoute.use("/filial", filialRoute)
mainRoute.use("/liked", likedRoute)
mainRoute.use("/oquv-markaz", oquvmarkazRoute)
mainRoute.use("/region", regionRoute)
mainRoute.use('/yozilish', yozilishRoute)
mainRoute.use('/yonalish', yonalishRoute)
mainRoute.use('/oquv-markaz-yonalish', oquvMarkazYonalishRoute)
mainRoute.use('/resurs-category', resursCategoryRoute)
mainRoute.use('/resurs-item', resursItemRoute)
mainRoute.use('/resurs', resursRoute)
mainRoute.use('/upload', uploadRoute)

export default mainRoute