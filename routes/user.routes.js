import { Router } from "express";
import { findAll, findOne, login, register, remove, sendOtp, update, verfyOtp } from "../controllers/user.controller.js";
import upload from "../config/multer.js";

let userRoute = Router()

userRoute.post('/send-otp', sendOtp)
userRoute.post('/verify-otp', verfyOtp)
userRoute.post('/register', register)
userRoute.post('/login', login)

userRoute.get('/', findAll)
userRoute.get('/:id', findOne)
userRoute.patch('/:id', update)
userRoute.delete('/:id', remove)

export default userRoute


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - fullname
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: Foydalanuvchi ID-si
 *         fullname:
 *           type: string
 *           description: Foydalanuvchi to'liq ismi
 *         email:
 *           type: string
 *           description: Foydalanuvchi email manzili
 *         password:
 *           type: string
 *           description: Foydalanuvchi paroli
 *         phone:
 *           type: string
 *           description: Foydalanuvchi telefon raqami
 *         role:
 *           type: string
 *           enum: ["user", "seo", "admin"]
 *           description: Foydalanuvchi roli
 *         image:
 *           type: string
 *           description: Profil rasmi (URL yoki fayl nomi)
 */

/**
 * @swagger
 * /send-otp:
 *   post:
 *     summary: OTP yuborish
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: OTP emailga yuborildi
 *       500:
 *         description: Server xatosi
 */

/**
 * @swagger
 * /verify-otp:
 *   post:
 *     summary: OTPni tekshirish
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               otp:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: OTP muvaffaqiyatli tasdiqlandi
 *       400:
 *         description: Noto‘g‘ri OTP
 *       500:
 *         description: Server xatosi
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Yangi foydalanuvchi ro‘yxatdan o‘tishi
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Ro‘yxatdan muvaffaqiyatli o‘tildi
 *       400:
 *         description: Hisob allaqachon mavjud
 *       500:
 *         description: Server xatosi
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Foydalanuvchi tizimga kirishi
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "P@ssword123"
 *     responses:
 *       200:
 *         description: Token qaytariladi
 *       400:
 *         description: Noto‘g‘ri parol
 *       403:
 *         description: Email topilmadi
 *       500:
 *         description: Server xatosi
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Barcha foydalanuvchilarni olish
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: pagesize
 *         in: query
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Foydalanuvchilar ro‘yxati
 *       404:
 *         description: Hech qanday foydalanuvchi topilmadi
 *       500:
 *         description: Server xatosi
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Bitta foydalanuvchini olish
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Foydalanuvchi ma’lumotlari
 *       404:
 *         description: Foydalanuvchi topilmadi
 *       500:
 *         description: Server xatosi
 */

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Foydalanuvchini yangilash
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Foydalanuvchi muvaffaqiyatli yangilandi
 *       400:
 *         description: Noto‘g‘ri ma’lumotlar
 *       404:
 *         description: Foydalanuvchi topilmadi
 *       500:
 *         description: Server xatosi
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Foydalanuvchini o‘chirish
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Foydalanuvchi muvaffaqiyatli o‘chirildi
 *       404:
 *         description: Foydalanuvchi topilmadi
 *       500:
 *         description: Server xatosi
 */
