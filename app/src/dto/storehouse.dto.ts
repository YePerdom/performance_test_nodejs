// src/dto/storehouse.dto.ts
import { IsBoolean, IsNotEmpty } from "class-validator";

/**
 * DTO for updating the active status of a storehouse (PATCH /storehouses/:id)
 * This ensures the incoming request has a valid boolean field for 'is_active'.
 */
export class UpdateStorehouseStatusDto {
  @IsNotEmpty({ message: "is_active is required." }) // Field cannot be missing
  @IsBoolean({ message: "is_active must be a boolean." }) // Must be true or false
  is_active!: boolean;
}


/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateStorehouseStatusDto:
 *       type: object
 *       properties:
 *         is_active:
 *           type: boolean
 *           description: Indicates whether the storehouse is active or not
 *           example: true
 *       required:
 *         - is_active
 */
