const express = require("express");
const router = express.Router();
const {
  getCustomers,
  getCustomerById,
  createCustomers,
  updateCustomers,
  deleteCustomers,
} = require("../controllers/customerController");

/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: Customer Data
 */

/**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: Get all customers
 *     tags: [Customers]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", getCustomers);

/**
 * @swagger
 * /api/customers/{id}:
 *   get:
 *     summary: Get customer by ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer ID
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/:id", getCustomerById);

/**
 * @swagger
 * /api/customers:
 *   post:
 *     summary: Create a new customer
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *              number: 1,
 *              nameOfLocation: Jakarta,
 *              date: 2025-05-03T00:00:00Z,
 *              loginHour: 08:30,
 *              name: John Doe,
 *              age: 30,
 *              gender: Male,
 *              email: johndoe@example.com,
 *              noTelp: +628123456789,
 *              brandDevice: Apple,
 *              digitalInterest: Technology,
 *              locationType: Urban
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/", createCustomers);

/**
 * @swagger
 * /api/customers/{id}:
 *   put:
 *     summary: Update a customer
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *              number: 1,
 *              nameOfLocation: Jakarta,
 *              date: 2025-05-03T00:00:00Z,
 *              loginHour: 08:30,
 *              name: John Doe,
 *              age: 30,
 *              gender: Male,
 *              email: johndoe@example.com,
 *              noTelp: +628123456789,
 *              brandDevice: Apple,
 *              digitalInterest: Technology,
 *              locationType: Urban
 *     responses:
 *       200:
 *         description: Updated
 */
router.put("/:id", updateCustomers);

/**
 * @swagger
 * /api/customers/{id}:
 *   delete:
 *     summary: Delete a customer
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer ID
 *     responses:
 *       200:
 *         description: Deleted
 */
router.delete("/:id", deleteCustomers);

module.exports = router;
