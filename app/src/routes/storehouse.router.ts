// src/routes/storehouse.router.ts
import express from "express";
import { updateStorehouseStatus } from "../controllers/storehouse.controller";
import { validateToken } from "../middlewares/validateToken.middleware";
import { authorizeRole } from "../middlewares/authorizeRole.middleware";
import { validateDto } from "../middlewares/validateDto.middleware";
import { UpdateStorehouseStatusDto } from "../dto/storehouse.dto";

const router = express.Router();

/**
 * @swagger
 * /storehouses/{id}/status:
 *   patch:
 *     summary: Activate or deactivate a storehouse
 *     tags: [Storehouses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Storehouse ID
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateStorehouseStatusDto'
 *     responses:
 *       200:
 *         description: Storehouse status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Storehouse activated successfully."
 *                 data:
 *                   $ref: '#/components/schemas/StorehouseResponseDto'
 *       400:
 *         description: Validation or update error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - only admin can access
 *       404:
 *         description: Storehouse not found
 */
router.patch(
  "/:id/status",
  validateToken,
  authorizeRole("admin"),
  validateDto(UpdateStorehouseStatusDto),
  updateStorehouseStatus
);

export default router;
