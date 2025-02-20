// import express from "express";
// import {
//   createResursItem,
//   deleteResursItem,
//   findBySearchResursItem,
//   getAllResursItem,
//   getOneResursItem,
//   updateResursItem,
// } from "../controllers/resursItem.controller.js";

// const resursItemRoute = express.Router();

// resursItemRoute.post("/", createResursItem);
// resursItemRoute.get("/", getAllResursItem);
// resursItemRoute.get("/query", findBySearchResursItem);
// resursItemRoute.get("/:id", getOneResursItem);
// resursItemRoute.patch("/:id", updateResursItem);
// resursItemRoute.delete("/:id", deleteResursItem);

// export default resursItemRoute;


import express from "express";
import {
  createResursItem,
  deleteResursItem,
  findBySearchResursItem,
  getAllResursItem,
  getOneResursItem,
  updateResursItem,
} from "../controllers/resursItem.controller.js";

const resursItemRoute = express.Router();

/**
 * @swagger
 * tags:
 *   name: ResursItem
 *   description: API for managing resource items
 */

/**
 * @swagger
 * /resurs-item:
 *   post:
 *     tags:
 *       - ResursItem
 *     summary: "Create a new resource item"
 *     description: "Create a new resource item that links a resource to a category"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               resursId:
 *                 type: integer
 *                 description: "The ID of the resource"
 *               resursCategoryId:
 *                 type: integer
 *                 description: "The ID of the resource category"
 *     responses:
 *       201:
 *         description: "Resource item created successfully"
 *       400:
 *         description: "Validation error"
 *       500:
 *         description: "Server error"
 */
resursItemRoute.post("/", createResursItem);

/**
 * @swagger
 * /resurs-item:
 *   get:
 *     tags:
 *       - ResursItem
 *     summary: "Get all resource items"
 *     description: "Retrieve all resource items with pagination, sorting, and associated resource and category data"
 *     parameters:
 *       - in: query
 *         name: page
 *         description: "Page number for pagination (default: 1)"
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: pagesize
 *         description: "Number of records per page (default: 10)"
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: "A list of resource items"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: "The unique identifier for the resource item"
 *                   resursId:
 *                     type: integer
 *                     description: "The ID of the associated resource"
 *                   resursCategoryId:
 *                     type: integer
 *                     description: "The ID of the associated category"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: "The date when the resource item was created"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: "The date when the resource item was last updated"
 *       500:
 *         description: "Server error"
 */
resursItemRoute.get("/", getAllResursItem);

/**
 * @swagger
 * /resurs-item/query:
 *   get:
 *     tags:
 *       - ResursItem
 *     summary: "Search resource items"
 *     description: "Search for resource items with optional filters, sorting, and pagination"
 *     parameters:
 *       - in: query
 *         name: sortBy
 *         description: "Field to sort by (default: id)"
 *         schema:
 *           type: string
 *           default: "id"
 *       - in: query
 *         name: order
 *         description: "Sort order (ASC/DESC)"
 *         schema:
 *           type: string
 *           default: "ASC"
 *       - in: query
 *         name: limit
 *         description: "Number of records per page"
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
 *         description: "A list of filtered and sorted resource items"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: "The unique identifier for the resource item"
 *                   resursId:
 *                     type: integer
 *                     description: "The ID of the associated resource"
 *                   resursCategoryId:
 *                     type: integer
 *                     description: "The ID of the associated category"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: "The date when the resource item was created"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: "The date when the resource item was last updated"
 *       500:
 *         description: "Server error"
 */
resursItemRoute.get("/query", findBySearchResursItem);

/**
 * @swagger
 * /resurs-item/{id}:
 *   get:
 *     tags:
 *       - ResursItem
 *     summary: "Get a single resource item by ID"
 *     description: "Retrieve a specific resource item by its ID, including associated resource and category"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "ID of the resource item to retrieve"
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "The requested resource item"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: "The unique identifier for the resource item"
 *                 resursId:
 *                   type: integer
 *                   description: "The ID of the associated resource"
 *                 resursCategoryId:
 *                   type: integer
 *                   description: "The ID of the associated category"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: "The date when the resource item was created"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: "The date when the resource item was last updated"
 *       404:
 *         description: "Resource item not found"
 *       500:
 *         description: "Server error"
 */
resursItemRoute.get("/:id", getOneResursItem);

/**
 * @swagger
 * /resurs-item/{id}:
 *   patch:
 *     tags:
 *       - ResursItem
 *     summary: "Update a resource item by ID"
 *     description: "Update an existing resource item by its ID"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "ID of the resource item to update"
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               resursId:
 *                 type: integer
 *                 description: "The ID of the resource"
 *               resursCategoryId:
 *                 type: integer
 *                 description: "The ID of the resource category"
 *     responses:
 *       200:
 *         description: "Resource item updated successfully"
 *       400:
 *         description: "Validation error"
 *       404:
 *         description: "Resource item not found"
 *       500:
 *         description: "Server error"
 */
resursItemRoute.patch("/:id", updateResursItem);

/**
 * @swagger
 * /resurs-item/{id}:
 *   delete:
 *     tags:
 *       - ResursItem
 *     summary: "Delete a resource item by ID"
 *     description: "Delete an existing resource item by its ID"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "ID of the resource item to delete"
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Resource item deleted successfully"
 *       404:
 *         description: "Resource item not found"
 *       500:
 *         description: "Server error"
 */
resursItemRoute.delete("/:id", deleteResursItem);

export default resursItemRoute;
