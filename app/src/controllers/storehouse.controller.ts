// src/controllers/storehouse.controller.ts
import { Request, Response } from "express";
import { StorehouseDAO } from "../dao/storehouse.dao";
import { UpdateStorehouseStatusDto } from "../dto/storehouse.dto";

/**
 * Controller to update the active status of a storehouse.
 * Handles PUT /storehouses/:id requests.
 */
export const updateStorehouseStatus = async (req: Request, res: Response) => {
  try {
    // Parse storehouse ID from the route parameter
    const id = parseInt(req.params.id);

    // Extract is_active field from the request body, validated via DTO
    const { is_active } : UpdateStorehouseStatusDto = req.body;

    // Validate that the ID is a number
    if (isNaN(id)) return res.status(400).json({ message: "Invalid storehouse ID." });

    // Call DAO method to update the storehouse status
    const storehouse = await StorehouseDAO.updateStorehouseStatus(id, is_active);

    // Return success response with updated storehouse
    return res.status(200).json({
      message: `Storehouse ${is_active ? "activated" : "deactivated"} successfully.`,
      data: storehouse,
    });
  } catch (error: any) {
    // Handle errors (storehouse not found, DB errors, etc.)
    console.error("Error updating storehouse status:", error);
    return res.status(400).json({ message: error.message || "Error updating storehouse status." });
  }
};
