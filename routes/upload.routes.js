import { Router } from "express";
import upload from "../config/multer.js";

const uploadRoute = Router()

uploadRoute.post("/", upload.single("image"))

export default uploadRoute