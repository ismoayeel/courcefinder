import Resurs from "../models/resurs.model.js";
import resursCategory from "../models/resursCategory.model.js";
import {
  resursCategoryUpdate,
  resursCategoryValidation,
} from "../validations/resursValidation.js";

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
    const resursList = await resursCategory.findAll({
      include: [
        {
          model: Resurs,
          attributes: ["id", "name", "media", "desc"],
        },
      ],
    });
    res.status(200).json(resursList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Resurslarni olishda xatolik" });
  }
};

async function findBySearchResursCategory(req, res) {
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
      if (
        key != "order" &&
        key != "createdAt" &&
        key != "limit" &&
        key != "page"
      ) {
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

    let data = await resursCategory.findAll({
      where: newObj,
      order: order,
      limit: limit,
      offset: offset,
      include: [
        {
          model: Resurs,
          attributes: ["id", "name", "media", "desc"],
        },
      ],
    });

    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}

const getOneResursCategoriy = async (req, res) => {
  try {
    const { id } = req.params;
    const resurs = await resursCategory.findByPk(id, {
      include: [
        {
          model: Resurs,
          attributes: ["id", "name", "media", "desc"],
        },
      ],
    });
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
  findBySearchResursCategory,
};
