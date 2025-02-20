import { Router } from "express";
import { findAll, findBySearch, findOne, login, register, registerAdmin, remove, resetPassword, sendOtp, update } from "../controllers/user.controller.js";
import verifytoken from "../middleware/verifyToken.js";
import selfpolice from "../middleware/selfPolice.js";
import checkRole from "../middleware/rolePolice.js";

let userRoute = Router()

userRoute.post('/send-otp', sendOtp)
userRoute.post('/register/:otp', register)
userRoute.post('/registerAdmin/:otp', registerAdmin)
userRoute.post('/send-reset-password', resetPassword)
userRoute.post('/reset-password', resetPassword)
userRoute.post('/login', login)

userRoute.get("/query", findBySearch)

userRoute.get('/', verifytoken, checkRole(["admin"]), findAll)
userRoute.get('/:id', verifytoken, checkRole(["admin"]), findOne)
userRoute.patch('/:id', verifytoken, selfpolice(['admin']), update)
userRoute.delete('/:id', verifytoken, checkRole(["admin", "seo", "user"]), remove)

export default userRoute