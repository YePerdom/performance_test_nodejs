// src/routes/customer.router.ts

import express from "express";
import {
  createCustomer,
  deactivateCustomer,
  getAllCustomers,
  searchCustomerByIdentification,
  updateCustomer,
} from "../controllers/customer.controller";
import { validateToken } from "../middlewares/validateToken.middleware";
import { authorizeRole } from "../middlewares/authorizeRole.middleware";
import { CreateCustomerDto, SearchCustomerDto, UpdateCustomerDto } from "../dto/customer.dto";
import { validateDto } from "../middlewares/validateDto.middleware";

const router = express.Router();

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Retrieve all registered customers
 *     description: |
 *       Returns a complete list of customers from the system.
 *       Only users with roles **admin** or **analista** are authorized.
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all customers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Customers fetched successfully.
 *                 total:
 *                   type: integer
 *                   example: 3
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CustomerResponseDto'
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       403:
 *         description: Forbidden - Insufficient role permissions
 */
router.get(
  "/",
  validateToken, // Ensure the user is authenticated
  authorizeRole("admin", "analista"), // Restrict access to specific roles
  getAllCustomers // Controller function handling the request
);

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Create a new customer
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCustomerDto'
 *     responses:
 *       201:
 *         description: Customer created successfully
 *       400:
 *         description: Validation or creation error
 *       403:
 *         description: Access denied for non-admin roles
 */
router.post(
  "/",
  validateToken, // Ensures the user is authenticated via JWT
  authorizeRole("admin"), // Restricts access to users with the 'admin' role
  validateDto(CreateCustomerDto), // Validates request body structure and data
  createCustomer // Calls controller to handle creation logic
);

/**
 * @swagger
 * /customers/search:
 *   post:
 *     summary: Search for a customer by identification
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SearchCustomerDto'
 *     responses:
 *       200:
 *         description: Customer found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Customer found successfully."
 *                 data:
 *                   $ref: '#/components/schemas/CustomerResponseDto'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - only admin or analyst can access
 *       404:
 *         description: Customer not found
 */
router.post(
  "/search",
  validateToken,
  authorizeRole("admin", "analista"),
  validateDto(SearchCustomerDto),
  searchCustomerByIdentification
);

/**
 * @swagger
 * /customers/{id}:
 *   put:
 *     summary: Update an existing customer
 *     tags:
 *       - Customers
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Customer ID to update
 *         required: true
 *         schema:
 *           type: integer
 *           example: 2
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCustomerDto'
 *     responses:
 *       200:
 *         description: Customer updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Customer updated successfully."
 *                 data:
 *                   $ref: '#/components/schemas/CustomerResponseDto'
 *       400:
 *         description: Validation or domain error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid customer ID."
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       403:
 *         description: Forbidden - insufficient role (only admin allowed)
 *       404:
 *         description: Customer not found
 */
router.put(
  "/:id",
  validateToken,
  authorizeRole("admin"),
  validateDto(UpdateCustomerDto),
  updateCustomer
);

/**
 * @swagger
 * /customers/{id}:
 *   delete:
 *     summary: Soft delete a customer (set is_active to false)
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the customer to deactivate
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Customer deactivated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Customer deactivated successfully."
 *                 data:
 *                   $ref: '#/components/schemas/CustomerResponseDto'
 *       400:
 *         description: Invalid ID or already inactive
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.delete(
  "/:id",
  validateToken,
  authorizeRole("admin"),
  deactivateCustomer
);

export default router;
