// import { Router } from "express";
// import {
//   findAll,
//   findBySearch,
//   findOne,
//   create,
//   update,
//   remove,
// } from "../controllers/oquvmarkazYonalish.controller.js";

// const oquvMarkazYonalishRoute = Router();

// oquvMarkazYonalishRoute.get("/", findAll);
// oquvMarkazYonalishRoute.get("/query", findBySearch);
// oquvMarkazYonalishRoute.get("/:id", findOne);
// oquvMarkazYonalishRoute.post("/", create);
// oquvMarkazYonalishRoute.patch("/:id", update);
// oquvMarkazYonalishRoute.delete("/:id", remove);

// export default oquvMarkazYonalishRoute;


import { Router } from "express";
import {
  findAll,
  findBySearch,
  findOne,
  create,
  update,
  remove,
} from "../controllers/oquvmarkazYonalish.controller.js";

const oquvMarkazYonalishRoute = Router();

/**
 * @swagger
 * tags:
 *   name: OquvMarkazYonalish
 *   description: API for managing relationships between Oquv Markaz and Yonalish
 */

/**
 * @swagger
 * /oquv-markaz-yonalish:
 *   get:
 *     tags:
 *       - OquvMarkazYonalish
 *     summary: Get all OquvMarkazYonalish relationships
 *     description: "Retrieve a paginated list of OquvMarkazYonalish relationships with related Oquv Markaz and Yonalish."
 *     parameters:
 *       - in: query
 *         name: page
 *         description: "The page number for pagination (default: 1)"
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: pagesize
 *         description: "The number of records per page (default: 10)"
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: "A list of OquvMarkazYonalish relationships"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: "The unique identifier for the OquvMarkazYonalish relationship"
 *                   oquvMarkazId:
 *                     type: integer
 *                     description: "The ID of the OquvMarkaz"
 *                   yonalishId:
 *                     type: integer
 *                     description: "The ID of the Yonalish"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: "The date when the relationship was created"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: "The date when the relationship was last updated"
 *       500:
 *         description: "Server error"
 */
oquvMarkazYonalishRoute.get("/", findAll);

/**
 * @swagger
 * /oquv-markaz-yonalish/query:
 *   get:
 *     tags:
 *       - OquvMarkazYonalish
 *     summary: "Search OquvMarkazYonalish relationships by query parameters"
 *     description: "Filter and sort OquvMarkazYonalish relationships based on search parameters."
 *     parameters:
 *       - in: query
 *         name: sortBy
 *         description: "Field to sort by (default: id)"
 *         schema:
 *           type: string
 *           default: "id"
 *       - in: query
 *         name: order
 *         description: "Order of the sort (ASC/DESC)"
 *         schema:
 *           type: string
 *           default: "ASC"
 *       - in: query
 *         name: limit
 *         description: "The number of records per page"
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: page
 *         description: "Page number for pagination"
 *         schema:
 *           type: integer
 *           default: 1
 *     responses:
 *       200:
 *         description: "A filtered list of OquvMarkazYonalish relationships"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: "The unique identifier for the OquvMarkazYonalish relationship"
 *                   oquvMarkazId:
 *                     type: integer
 *                     description: "The ID of the OquvMarkaz"
 *                   yonalishId:
 *                     type: integer
 *                     description: "The ID of the Yonalish"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: "The date when the relationship was created"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: "The date when the relationship was last updated"
 *       500:
 *         description: "Server error"
 */
oquvMarkazYonalishRoute.get("/query", findBySearch);

/**
 * @swagger
 * /oquv-markaz-yonalish/{id}:
 *   get:
 *     tags:
 *       - OquvMarkazYonalish
 *     summary: "Get a single OquvMarkazYonalish relationship by ID"
 *     description: "Retrieve a specific OquvMarkazYonalish relationship by its ID with related Oquv Markaz and Yonalish."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "ID of the OquvMarkazYonalish relationship to retrieve"
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "The requested OquvMarkazYonalish relationship"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: "The unique identifier for the OquvMarkazYonalish relationship"
 *                 oquvMarkazId:
 *                   type: integer
 *                   description: "The ID of the OquvMarkaz"
 *                 yonalishId:
 *                   type: integer
 *                   description: "The ID of the Yonalish"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: "The date when the relationship was created"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: "The date when the relationship was last updated"
 *       404:
 *         description: "OquvMarkazYonalish not found"
 *       500:
 *         description: "Server error"
 */
oquvMarkazYonalishRoute.get("/:id", findOne);

/**
 * @swagger
 * /oquv-markaz-yonalish:
 *   post:
 *     tags:
 *       - OquvMarkazYonalish
 *     summary: "Create a new OquvMarkazYonalish relationship"
 *     description: "Add a new OquvMarkazYonalish relationship to the database."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oquvMarkazId:
 *                 type: integer
 *                 description: "The ID of the OquvMarkaz"
 *               yonalishId:
 *                 type: integer
 *                 description: "The ID of the Yonalish"
 *     responses:
 *       201:
 *         description: "OquvMarkazYonalish created successfully"
 *       400:
 *         description: "Validation error"
 *       500:
 *         description: "Server error"
 */
oquvMarkazYonalishRoute.post("/", create);

/**
 * @swagger
 * /oquv-markaz-yonalish/{id}:
 *   patch:
 *     tags:
 *       - OquvMarkazYonalish
 *     summary: "Update an OquvMarkazYonalish relationship by ID"
 *     description: "Modify an existing OquvMarkazYonalish relationship by its ID."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "ID of the OquvMarkazYonalish relationship to update"
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oquvMarkazId:
 *                 type: integer
 *                 description: "The ID of the OquvMarkaz"
 *               yonalishId:
 *                 type: integer
 *                 description: "The ID of the Yonalish"
 *     responses:
 *       200:
 *         description: "OquvMarkazYonalish updated successfully"
 *       400:
 *         description: "Validation error"
 *       404:
 *         description: "OquvMarkazYonalish not found"
 *       500:
 *         description: "Server error"
 */
oquvMarkazYonalishRoute.patch("/:id", update);

/**
 * @swagger
 * /oquv-markaz-yonalish/{id}:
 *   delete:
 *     tags:
 *       - OquvMarkazYonalish
 *     summary: "Delete an OquvMarkazYonalish relationship by ID"
 *     description: "Remove an OquvMarkazYonalish relationship from the database by its ID."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "ID of the OquvMarkazYonalish relationship to delete"
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "OquvMarkazYonalish deleted successfully"
 *       404:
 *         description: "OquvMarkazYonalish not found"
 *       500:
 *         description: "Server error"
 */
oquvMarkazYonalishRoute.delete("/:id", remove);

export default oquvMarkazYonalishRoute;
