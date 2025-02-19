import Resurs from "../models/resurs.model.js";
import { resursUpdate, resursValidation } from "../validations/resursValidation.js";

const createResurs = async (req, res) => {
  try {
    let { error, value } = resursValidation.validate(req.body);
    if (error) {
      return res.send(error.details[0].message);
    }
    await Resurs.create(req.body);
    res.status(201).json({ message: "Resurs muvaffaqiyatli yaratildi" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Resurs yaratishda xatolik" });
  }
};

const getAllResurs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pagesize = parseInt(req.query.pagesize) || 10;
    const offset = (page - 1) * pagesize;

    let resursList = await Resurs.findAll({ limit: pagesize, offset: offset });
    res.status(200).json(resursList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Resurslarni olishda xatolik" });
  }
};

const getOneResurs = async (req, res) => {
  try {
    const { id } = req.params;
    const resurs = await Resurs.findByPk(id);
    if (!resurs) {
      return res.status(404).json({ message: "Resurs topilmadi" });
    }
    res.status(200).json(resurs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Resursni olishda xatolik" });
  }
};

const updateResurs = async (req, res) => {
  try {
    let { error, value } = resursUpdate.validate(req.body);
    if (error) {
      return res.send(error.details[0].message);
    }
    await Resurs.update(req.body, { where: { id: req.params.id } });
    res.send("Reurs muvaffaqiyatli yangilandi");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Resursni yangilashda xatolik" });
  }
};

const deleteResurs = async (req, res) => {
  try {
    const { id } = req.params;
    await Resurs.destroy(id);
    res.status(200).json({ message: "Resurs muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Resursni o'chirishda xatolik" });
  }
};

export { createResurs, getAllResurs, getOneResurs, updateResurs, deleteResurs };
