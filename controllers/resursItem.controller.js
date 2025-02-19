import resursItem from "../models/resursItem.model.js";
import { resursItemUpdate, resursItemvalidation } from "../validations/resursValidation.js";

const createResursItem = async (req, res) => {
  try {
    let { error, value } = resursItemvalidation.validate(req.body);
    if (error) {
      return res.send(error.details[0].message);
    }
    await resursItem.create(req.body);
    res.status(201).json({ message: "Resurs muvaffaqiyatli yaratildi" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Resurs yaratishda xatolik" });
  }
};

const getAllResursItem = async (req, res) => {
  try {
    const resursList = await resursItem.findAll();
    res.status(200).json(resursList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Resurslarni olishda xatolik" });
  }
};

const getOneResursItem = async (req, res) => {
  try {
    const { id } = req.params;
    const resurs = await resursItem.findByPk(id);
    if (!resurs) {
      return res.status(404).json({ message: "Resurs topilmadi" });
    }
    res.status(200).json(resurs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Resursni olishda xatolik" });
  }
};

const updateResursItem = async (req, res) => {
  try {
    let { error, value } = resursItemUpdate.validate(req.body);
    if (error) {
      return res.send(error.details[0].message);
    }
    await resursItem.update(req.body, { where: { id: req.params.id } });
    res.send("Reurs muvaffaqiyatli yangilandi");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Resursni yangilashda xatolik" });
  }
};

const deleteResursItem = async (req, res) => {
  try {
    const { id } = req.params;
    await resursItem.destroy(id);
    res.status(200).json({ message: "Resurs muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Resursni o'chirishda xatolik" });
  }
};

export {
  createResursItem,
  getAllResursItem,
  getOneResursItem,
  updateResursItem,
  deleteResursItem,
};
