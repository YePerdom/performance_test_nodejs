// src/dao/storehouse.dao.ts
import { Storehouse } from "../models";

export class StorehouseDAO {
  /**
   * Fetch all active storehouses from the database.
   * @returns Promise<Storehouse[]> List of storehouses that have is_active = true
   */
  static async findAllActive() {
    return Storehouse.findAll({
      where: { is_active: true }, // Only active storehouses
      attributes: ["id_storehouse", "name", "address", "is_active", "createdAt"], // Select specific fields
      order: [["id_storehouse", "ASC"]], // Sort by storehouse ID ascending
    });
  }

  /**
   * Update the active status of a storehouse by ID.
   * @param id - The ID of the storehouse to update
   * @param is_active - Boolean flag indicating new active status
   * @returns Promise<Storehouse> Updated storehouse instance
   * @throws Error if storehouse with given ID does not exist
   */
  static async updateStorehouseStatus(id: number, is_active: boolean) {
    const storehouse = await Storehouse.findByPk(id); // Find storehouse by primary key

    if (!storehouse) throw new Error("Storehouse not found."); // Throw error if not found

    await storehouse.update({ is_active }); // Update is_active field
    return storehouse; // Return updated storehouse
  }
}
