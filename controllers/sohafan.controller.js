import Sohafan from "../models/sofaFan.model.js";
import Yonalish from "../models/yonalish.model.js";
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
      include: [
        {
          model: Yonalish,
          attributes: ["id", "name"],
        }
      ],
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

    let data = await Sohafan.findAll({
      where: newObj,
      order: order,
      limit: limit,
      offset: offset,
      include: [
        {
          model: Yonalish,
          attributes: ["id", "name"],
        }
      ]
    });

    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
async function findOne(req, res) {
  try {
    let data = await Sohafan.findByPk(req.params.id, {
      include: [
        {
          model: Yonalish,
          attributes: ["id", "name"],
        }
      ]
    });
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
