import { Router } from "express";
import { findAll, findOne, login, register, remove, sendOtp, update, verfyOtp } from "../controllers/user.controller.js";


let userRoute = Router()

userRoute.post('/send-otp',sendOtp)
userRoute.post('/verify-otp', verfyOtp)
userRoute.post('/register', register)
userRoute.post('/login',login)

userRoute.get('/', findAll)
userRoute.get('/:id',findOne)
userRoute.patch('/:id',update)
userRoute.delete('/:id',remove)

export default userRoute