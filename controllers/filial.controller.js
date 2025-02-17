import Filial from "../models/filial.model.js";
import { filialUpdate } from "../validations/updateValidations.js";
import { filialValidation } from "../validations/validations.js";
import { promises as fs } from "fs"

async function findAll(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const offset = (page - 1) * pageSize;

        let data = await Filial.findAll({ limit: pageSize, offset: offset })
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
        let data = await Filial.findAll({ where: newObj });
        res.send(data)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
};
async function findOne(req, res) {
    try {
        let data = await Filial.findByPk(req.params.id)
        res.send(data)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
};
async function create(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        let { filename } = req.file
        let data = req.body
        let { error, value } = filialValidation.validate(req.body)
        if (error) {
            res.status(400).send(error.details[0].message)
            await fs.unlink(`./uploads/${filename}`)
            return
        }
        let newItem = {
            ...req.body,
            image: filename
        }

        await Filial.create(newItem)
        res.status(201).send("created Successfully ✅")
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
};
async function update(req, res) {
    try {
        let { error, value } = filialUpdate.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        let data = await Filial.update(req.body, { where: { id: req.params.id } })
        res.send("updated successfully ✅")
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
};
async function remove(req, res) {
    try {
        await Filial.destroy({ where: { id: req.params.id } })
        res.send("deleted successfully ✅")
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
};

export { findAll, findBySearch, findOne, create, update, remove }