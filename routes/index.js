import { Router } from "express";
import userRoute from "./user.routes.js";


let mainRote = Router();
mainRote.use('/users', userRoute)

export default mainRote