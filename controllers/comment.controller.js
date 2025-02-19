import Comment from "../models/comment.model.js";
import User from "../models/user.model.js";
import { commentValidation } from "../validations/validations.js";

async function findAll(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const pagesize = parseInt(req.query.pagesize) || 10;
        const offset = (page - 1) * pagesize;

        let data = await Comment.findAll({
            limit: pageSize,
            offset: offset,
            include: [{ model: User, attributes: ['id', 'fullname', 'image', 'email', 'phone', 'role'] }, { model: Oquvmarkaz, attributes: ['id', 'name', 'image'] }]
        })
        res.send(data)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
};
async function findBySearch(req, res) {
    try {
        let query = req.query;
        let keys = Object.keys(query);
        let values = Object.values(query);
        let newObj = {};
        values.forEach((val, index) => {
            if (val) {
                newObj[keys[index]] = val;
            }
        });
        console.log(newObj);
        let data = await Comment.findAll({
            where: newObj, include: [{ model: User, attributes: ['id', 'fullname', 'image', 'email', 'phone', 'role'] }, { model: Oquvmarkaz, attributes: ['id', 'name', 'image'] }]
        });
        res.send(data)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
};
async function findOne(req, res) {
    try {
        let data = await Comment.findByPk(req.params.id, {
            include: [{ model: User, attributes: ['id', 'fullname', 'image', 'email', 'phone', 'role'] }, { model: Oquvmarkaz, attributes: ['id', 'name', 'image'] }]
        })
        res.send(data)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
};
async function create(req, res) {
    try {
        let { error, value } = commentValidation.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        await Comment.create(req.body)
        res.status(201).send("created Successfully ✅")
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
};
async function remove(req, res) {
    try {
        await Comment.destroy({ where: { id: req.params.id } })
        res.send("deleted successfully ✅")
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
};

export { findAll, findBySearch, findOne, create, remove }