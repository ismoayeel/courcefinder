import { totp } from "otplib";
import { registerValidate, userUpdateValid } from "../validations/user.validate.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import SendMail from "../config/nodemailer.js";
import jwt from "jsonwebtoken"
import { promises as fs } from "fs"
import { Op } from "sequelize";
import { registerAdminValidate } from "../validations/userAdmin.validate.js";
import Comment from "../models/comment.model.js";
import Oquvmarkaz from "../models/oquvMarkaz.model.js";
import Resurs from "../models/resurs.model.js";

dotenv.config()

totp.options = { step: 500, digits: 6 };

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

async function register(req, res) {
    try {
        const { otp } = req.params
        const { error } = registerValidate.validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message })
        }
        const { fullname, phone, password, email, role, image } = req.body

        const checkOtp = totp.check(otp, `${process.env.OTPKEY}${email}`);
        if (!checkOtp) {
            return res.status(400).send({ message: "Email OTP bilan tasdiqlanmagan" });
        }

        const newUser = await User.findOne({ where: { email } })
        if (newUser) {
            res.status(400).send({ message: "This account already exists" })
            return
        }
        const hashPassword = bcrypt.hashSync(password, 7);
        await User.create({ fullname, phone, password: hashPassword, email, role, image })

        res.status(201).send({ message: "Register successfully✅" })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message })
    }
}

async function registerAdmin(req, res) {
    try {
        const { otp } = req.params
        const { error } = registerAdminValidate.validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message })
        }
        const { fullname, phone, password, email, role, image } = req.body

        const checkOtp = totp.check(otp, `${process.env.OTPKEY}${email}`);
        if (!checkOtp) {
            return res.status(400).send({ message: "Email OTP bilan tasdiqlanmagan" });
        }

        const newUser = await User.findOne({ where: { email } })
        if (newUser) {
            res.status(400).send({ message: "This account already exists" })
            return
        }
        const hashPassword = bcrypt.hashSync(password, 7);
        await User.create({ fullname, phone, password: hashPassword, email, role, image })

        res.status(201).send({ message: "Register successfully✅" })
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
        const token = jwt.sign({ id: user.id, email: user.email, role: user.role, image: user.image }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
        res.status(200).send({ message: token })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message })
    }
}

async function findBySearch(req, res) {
    try {
        console.log(req.query);
        let query = req.query;
        let newObj = {};
        let order = [];

        let sortBy = query.sortBy || "id";
        let sortOrder = query.order?.toLowerCase() === "desc" ? "DESC" : "ASC";

        let createdAtOrder = query.createdAt?.toLowerCase() === "asc" ? "ASC" : "DESC";

        Object.keys(query).forEach((key) => {
            if (!["order", "createdAt", "limit", "page", "sortBy"].includes(key)) {
                newObj[key] = { [Op.like]: `%${query[key]}%` };
            }
        });

        order.push([sortBy, sortOrder]);
        if (sortBy !== "createdAt") {
            order.push(["createdAt", createdAtOrder]);
        }

        let limit = parseInt(query.limit) || 10;
        let page = parseInt(query.page) || 1;
        let offset = (page - 1) * limit;

        console.log("Query:", newObj);
        console.log("Order By:", order);
        console.log("Pagination:", { limit, offset });

        let data = await User.findAll({
            where: newObj,
            order: order,
            limit: limit,
            offset: offset,
            include: [{ model: Comment }, { model: Oquvmarkaz }, { model: Resurs }]
        });

        res.send(data);
    } catch (error) {
        console.error("Error:", error);
        res.status(400).json({ message: "Error occurred", error: error.message });
    }
};

async function findAll(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const pagesize = parseInt(req.query.pagesize) || 10;
        const offset = (page - 1) * pagesize;

        let user = await User.findAll({
            limit: pagesize, offset: offset,
            include: [{ model: Comment }, { model: Oquvmarkaz }, { model: Resurs }]
        })
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
        const user = await User.findByPk(req.params.id, {
            include: [{ model: Comment }, { model: Oquvmarkaz }, { model: Resurs }]
        });
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
        console.log(req.user);
        const { fullname, email, image, phone, password } = req.body;
        if (image) {
            await fs.unlink(`./uploads/${req.user.image}`)
        }
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        await User.update({ fullname, email, role, image, phone, password }, { where: { id } });

        const updatedUser = await User.findByPk(id)

        res.status(200).send({ message: "User updated successfully", data: updatedUser });
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

export { sendOtp, register, findAll, findOne, update, remove, login, findBySearch, registerAdmin }