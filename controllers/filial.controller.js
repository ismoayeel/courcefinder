import Filial from "../models/filial.model.js";
import { filialUpdate } from "../validations/updateValidations.js";
import { filialValidation } from "../validations/validations.js";

async function findAll(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const pagesize = parseInt(req.query.pagesize) || 10;
        const offset = (page - 1) * pagesize;

        let data = await Filial.findAll({
            limit: pagesize, offset: offset, include: [
                { model: Oquvmarkaz, attributes: ['id', 'name', 'image'] },
                { model: Region, attributes: ['id', 'name'] }
            ]
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
        let data = await Filial.findAll({
            where: newObj, include: [
                { model: Oquvmarkaz, attributes: ['id', 'name'] },
                { model: Region, attributes: ['id', 'name'] }
            ]
        });
        res.send(data)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
};
async function findOne(req, res) {
    try {
        let data = await Filial.findByPk(req.params.id, {
            include: [
                { model: Oquvmarkaz, attributes: ['id', 'name'] },
                { model: Region, attributes: ['id', 'name'] }
            ]
        })
        res.send(data)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
};
async function create(req, res) {
    try {
        let { error, value } = filialValidation.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        await Filial.create(req.body)
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