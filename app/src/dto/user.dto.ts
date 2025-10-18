// Import validators from class-validator to enforce data validation
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length, MinLength } from 'class-validator';

// Define an ENUM for user roles
export enum UserRole {
  ADMIN = 'admin',    // Administrator role
  ANALISTA = 'analista', // Analyst role
}

// ------------------- CREATE USER DTO -------------------
export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Field name is required.' })
  @Length(3, 50, { message: 'Name must be between 3 and 50 characters.' })
  name: string;

  @IsEmail({}, { message: 'Email format is invalid.' })
  @IsNotEmpty({ message: 'Field email is required.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Field password is required.' })
  @MinLength(6, { message: 'Password must be at least 6 characters long.' })
  password: string;

  @IsOptional()
  @IsEnum(UserRole, { message: 'Role must be either admin or analista.' })
  rol?: UserRole;
}

// ------------------- UPDATE USER DTO -------------------
export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(3, 50, { message: 'Name must be between 3 and 50 characters.' })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email format is invalid.' })
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long.' })
  password?: string;

  @IsOptional()
  @IsEnum(UserRole, { message: 'Role must be either admin or analista.' })
  rol?: UserRole;

  @IsOptional()
  @IsBoolean({ message: 'is_active must be a boolean value.' })
  is_active?: boolean;
}

// ------------------- LOGIN USER DTO -------------------
export class LoginUserDto {
  @IsEmail({}, { message: 'Email format is invalid.' })
  @IsNotEmpty({ message: 'Field email is required.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Field password is required.' })
  password: string;
}

// ------------------- GET USER PARAMS DTO -------------------
export class GetUserParamsDto {
  @IsNotEmpty({ message: 'ID is required.' })
  @IsString({ message: 'ID must be a string.' })
  id!: string;
}

// ------------------- GET USER QUERY DTO -------------------
export class GetUserQueryDto {
  @IsOptional()
  @IsBoolean({ message: 'is_active must be a boolean value.' })
  is_active?: boolean;

  @IsOptional()
  @IsEnum(UserRole, { message: 'Role must be either admin or analista.' })
  rol?: UserRole;
}

// ------------------- USER RESPONSE DTO -------------------
export class UserResponseDto {
  id_user!: number;
  name!: string;
  email!: string;
  rol!: UserRole;
  is_active!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
}

/**
 * Swagger annotations for API documentation:
 * 
 * - Defines all user-related schemas, including Create, Update, Login, Get params/query, and response DTOs.
 * - Ensures Swagger UI shows clear descriptions, required fields, types, and examples.
 * - Maps the UserRole enum for both validation and documentation.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserRole:
 *       type: string
 *       enum: [admin, analista]
 *       description: Available user roles.
 *
 *     CreateUserDto:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           example: "John Doe"
 *           description: Full name of the user.
 *         email:
 *           type: string
 *           example: "john.doe@example.com"
 *           description: Valid email address of the user.
 *         password:
 *           type: string
 *           example: "password123"
 *           description: Password must be at least 6 characters long.
 *         rol:
 *           $ref: '#/components/schemas/UserRole'
 *           example: admin
 *           description: User role (admin or analista).
 *
 *     UpdateUserDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Jane Doe"
 *           description: Updated full name of the user.
 *         email:
 *           type: string
 *           example: "jane.doe@example.com"
 *           description: Updated email address.
 *         password:
 *           type: string
 *           example: "newpassword456"
 *           description: Updated password.
 *         rol:
 *           $ref: '#/components/schemas/UserRole'
 *           example: analista
 *           description: Updated user role.
 *         is_active:
 *           type: boolean
 *           example: true
 *           description: Indicates whether the user is active.
 *
 *     LoginUserDto:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           example: "john.doe@example.com"
 *           description: User email address.
 *         password:
 *           type: string
 *           example: "password123"
 *           description: User password.
 *
 *     GetUserParamsDto:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *           example: "123"
 *           description: Unique identifier of the user.
 *
 *     GetUserQueryDto:
 *       type: object
 *       properties:
 *         is_active:
 *           type: boolean
 *           example: true
 *           description: Filter users by active status.
 *         rol:
 *           $ref: '#/components/schemas/UserRole'
 *           example: analista
 *           description: Filter users by role.
 *
 *     UserResponseDto:
 *       type: object
 *       properties:
 *         id_user:
 *           type: integer
 *           example: 1
 *           description: Unique user ID.
 *         name:
 *           type: string
 *           example: "John Doe"
 *           description: Full name of the user.
 *         email:
 *           type: string
 *           example: "john.doe@example.com"
 *           description: Email address of the user.
 *         rol:
 *           $ref: '#/components/schemas/UserRole'
 *           example: admin
 *           description: Role assigned to the user.
 *         is_active:
 *           type: boolean
 *           example: true
 *           description: Indicates if the user is active.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-10-17T15:23:45Z"
 *           description: Date when the user was created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-10-17T18:40:22Z"
 *           description: Date of the last user update.
 */