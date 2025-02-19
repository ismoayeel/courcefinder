import Comment from "../models/comment.model.js";
import Oquvmarkaz from "../models/oquvMarkaz.model.js";
import User from "../models/user.model.js";
import { commentValidation } from "../validations/validations.js";

async function findAll(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const pagesize = parseInt(req.query.page) || 10;
        const offset = (page - 1) * pagesize;

        let data = await Comment.findAll({
            limit: pagesize,
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
        let newObj = {};
        let order = [];

        let sortOrder = null;
        let createdAtOrder = "DESC";

        if (query.order) {
            if (query.order.toLowerCase() == "asc") {
                sortOrder = "ASC";
            } else if (query.order.toLowerCase() == "desc") {
                sortOrder = "DESC";
            }
        }

        if (query.createdAt) {
            if (query.createdAt.toLowerCase() == "asc") {
                createdAtOrder = "ASC";
            } else if (query.createdAt.toLowerCase() == "desc") {
                createdAtOrder = "DESC";
            }
        }

        Object.keys(query).forEach((key) => {
            if (key != "order" && key != "createdAt" && key != "limit" && key != "page") {
                newObj[key] = { [Op.like]: `%${query[key]}%` };
            }
        });

        if (sortOrder != null) {
            order.push(["fullname", sortOrder]);
        }

        order.push(["createdAt", createdAtOrder]);

        let limit = 10;
        let page = 1;
        let offset = 0;

        if (query.limit) {
            let parsedLimit = parseInt(query.limit);
            if (!isNaN(parsedLimit) && parsedLimit > 0) {
                limit = parsedLimit;
            }
        }

        if (query.page) {
            let parsedPage = parseInt(query.page);
            if (!isNaN(parsedPage) && parsedPage > 0) {
                page = parsedPage;
            }
        }

        offset = (page - 1) * limit;

        console.log("Query:", newObj);
        console.log("Order By:", order);
        console.log("Pagination:", { limit, offset });

        let data = await Comment.findAll({
            where: newObj,
            order: order,
            limit: limit,
            offset: offset,
            include: [{ model: User, attributes: ['id', 'fullname', 'image', 'email', 'phone', 'role'] }, {
                model: Oquvmarkaz, attributes: ['id', 'name', 'image']
            }]
        });

        res.send(data);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
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