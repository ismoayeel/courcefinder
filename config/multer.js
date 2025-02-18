import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    },
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
});

const upload = multer({
    storage, limits: {
        fileSize: 5 * 1024 * 1024
    }
});

export default upload;

















// let storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "./uploads");
//     },
//     filename: (req, file, cb) => {
//         const extname = path.extname(file.originalname);
//         cb(null, `${Date.now()}${extname}`);
//     }
// });

// let upload = multer({
//     storage,
//     limits: {
//         fileSize: 5 * 1024 * 1024
//     }
// });

// export default upload;

// let dest = "uploads"
// const storage = multer.diskStorage({
//     filename: (req, file, cb) => {
//         cb(null, Math.random() + file.originalname)
//     },
//     destination: (req, file, cb) => {
//         cb(null, dest)
//     }
// })
// const upload = multer({ storage: storage })
// app.post("/upload", upload.single("picture"), (req, res) => {
//     res.send(req.file)
// })
// app.use("/rasm", express.static(dest))
