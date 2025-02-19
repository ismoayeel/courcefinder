import Sohafan from "../models/sofaFan.model.js";
import {
  sohaFanUpdate,
  sohaFanValidation,
} from "../validations/resursValidation.js";

async function findAll(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const pagesize = parseInt(req.query.pagesize) || 10;
    const offset = (page - 1) * pagesize;

    let data = await Sohafan.findAndCountAll({
      limit: pagesize,
      offset: offset,
    });
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}
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
    let data = await Sohafan.findAll({ where: obj });
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}
async function findOne(req, res) {
  try {
    let data = await Sohafan.findByPk(req.params.id);
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}
async function create(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Fayl yuklanmadi" });
    }
    let { filename } = req.file;
    let data = req.body;
    let { error, value } = sohaFanValidation.validate(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      await fs.unlink(`./uploads/${filename}`);
      return;
    }
    let newItem = {
      ...req.body,
      image: filename,
    };

    await Sohafan.create(newItem);
    res.status(201).send("Muvaffaqiyatli yaratildi");
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}
async function update(req, res) {
  try {
    let { error, value } = sohaFanUpdate.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    await Sohafan.update(req.body, {
      where: { id: req.params.id },
    });
    res.send("Muvaffaqiyatli yangilandi");
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}
async function remove(req, res) {
  try {
    await Sohafan.destroy({ where: { id: req.params.id } });
    res.send("Muvaffaqiyatli o'chirildi");
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}

export { findAll, findBySearch, findOne, create, update, remove };
