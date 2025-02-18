import { Router } from "express";
import upload from "../config/multer.js";

const uploadRoute = Router()

uploadRoute.post("/", upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send("file not found");
    }
    res.send(`Loaded successfully:  ${req.file.filename}  ✅`);
});

export default uploadRoute