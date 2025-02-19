import resursCategory from "../models/resursCategory.model.js";
import { resursCategoryUpdate, resursCategoryValidation } from "../validations/resursValidation.js";

const createResursCategoriy = async (req, res) => {
  try {
    let { error, value } = resursCategoryValidation.validate(req.body);
    if (error) {
      return res.send(error.details[0].message);
    }
    await resursCategory.create(req.body);
    res.status(201).json({ message: "Resurs muvaffaqiyatli yaratildi" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Resurs yaratishda xatolik" });
  }
};

const getAllResursCategoriy = async (req, res) => {
  try {
    const resursList = await resursCategory.findAll();
    res.status(200).json(resursList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Resurslarni olishda xatolik" });
  }
};

const getOneResursCategoriy = async (req, res) => {
  try {
    const { id } = req.params;
    const resurs = await resursCategory.findByPk(id);
    if (!resurs) {
      return res.status(404).json({ message: "Resurs topilmadi" });
    }
    res.status(200).json(resurs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Resursni olishda xatolik" });
  }
};

const updateResursCategoriy = async (req, res) => {
  try {
    let { error, value } = resursCategoryUpdate.validate(req.body);
    if (error) {
      return res.send(error.details[0].message);
    }
    await resursCategory.update(req.body, { where: { id: req.params.id } });
    res.send("Reurs muvaffaqiyatli yangilandi");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Resursni yangilashda xatolik" });
  }
};

const deleteResursCategoriy = async (req, res) => {
  try {
    const { id } = req.params;
    await resursCategory.destroy(id);
    res.status(200).json({ message: "Resurs muvaffaqiyatli o'chirildi" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Resursni o'chirishda xatolik" });
  }
};

export {
  createResursCategoriy,
  getAllResursCategoriy,
  getOneResursCategoriy,
  updateResursCategoriy,
  deleteResursCategoriy,
};
