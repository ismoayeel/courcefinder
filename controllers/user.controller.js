import { totp } from "otplib";
import { registerValidate, userUpdateValid } from "../validations/user.validate.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import SendMail from "../config/nodemailer.js";

dotenv.config()

totp.options = { step: 15, digits: 6 };

async function sendOtp(req, res) {
    try {
        const { email } = req.body;
        const otp = totp.generate(`${process.env.OTPKEY}${email}`)
        await SendMail(email, otp);
        res.status(200).send({ message: "OTP emailga yuborildi" })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message })
    }
}

async function verfyOtp(req, res) {
    try {
        const { email, otp } = req.body
        const checkOtp = totp.check(otp, `${process.env.OTPKEY}${email}`);
        if (!checkOtp) {
            return res.status(400).send({ message: "invalid otp" })
        }
        res.status(200).send({ message: "OTP verified successfully ✅, You can register now" })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message })
    }
}
async function register(req, res) {
    try {
        let { filename } = req.file || null
        const { error } = registerValidate.validate(req.body);
        if (error) {
            res.status(400).send(error.details[0].message)
            await fs.unlink(`./uploads/${filename}`)
            return
        }
        const { email } = req.body
        const newUser = await User.findOne({ where: { email } })
        if (newUser) {
            await fs.unlink(`./uploads/${filename}`)
            res.status(400).send({ message: "This account already exists" })
            return
        }
        const hashPassword = bcrypt.hashSync(password, 10);
        let newItem = {
            ...req.body,
            password: hashPassword,
            image: filename
        }
        await User.create(newItem)
        res.status(201).send({ message: "Registered successfully✅" })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message })
    }
}
async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return res.status(403).send({ message: "Email not found" });
        }
        const comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return res.status(400).send({ message: "Incorrect password" });
        }
        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message })
    }
}
async function findAll(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const pagesize = parseInt(req.query.pagesize) || 10;
        const offset = (page - 1) * pagesize;

        let user = await Region.findAll({ limit: pagesize, offset: offset })
        if (!user.length) {
            return res.status(404).send({ message: "User empty" });
        }
        res.status(200).send({ data: user })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message })
    }
}
async function findOne(req, res) {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).send({ data: user })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message })
    }
}

async function update(req, res) {
    try {
        const { id } = req.params;
        const { error } = userUpdateValid.validate(req.body)
        if (error) {
            return res.status(400).send({ message: error.details[0].message })
        }
        const { fullname, email, role, image, phone } = req.body;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        await User.update({ fullname, email, role, image, phone, password });
        res.status(200).send({ message: "User updated successfully", data: user });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message })
    }
}

async function remove(req, res) {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        await user.destroy();
        res.status(200).send({ message: "User deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error_message: error.message });
    }
}

export { sendOtp, verfyOtp, register, findAll, findOne, update, remove, login }