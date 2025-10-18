import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from "class-validator";

/**
 * DTO used to validate and transform the data sent when creating a new customer
 * (endpoint: POST /customers).
 *
 * Each property is validated using decorators from `class-validator` to ensure
 * that incoming data meets specific constraints before reaching the controller.
 */
export class CreateCustomerDto {
  // Identification number (e.g., national ID or internal code)
  // Must be a string between 6 and 20 characters long.
  @IsNotEmpty({ message: "Identification is required." })
  @IsString({ message: "Identification must be a string." })
  @Length(6, 20, {
    message: "Identification must be between 6 and 20 characters.",
  })
  identification!: string;

  // Full name of the customer (3–50 characters)
  @IsNotEmpty({ message: "Name is required." })
  @IsString({ message: "Name must be a string." })
  @Length(3, 50, { message: "Name must be between 3 and 50 characters." })
  name!: string;

  // Customer’s email address — must be in a valid email format
  @IsEmail({}, { message: "A valid email is required." })
  email!: string;
}

/**
 * DTO used to validate the body when updating an existing customer
 * (endpoint: PUT /customers/:id).
 *
 * All fields are optional because not every property must be updated.
 */
export class UpdateCustomerDto {
  // Optional name field — if provided, must be a valid string between 3 and 50 characters
  @IsOptional()
  @IsString({ message: "Name must be a string." })
  @Length(3, 50, { message: "Name must be between 3 and 50 characters." })
  name?: string;

  // Optional email field — if provided, must be in valid email format
  @IsOptional()
  @IsEmail({}, { message: "A valid email is required." })
  email?: string;

  // Optional boolean field indicating whether the customer is active
  @IsOptional()
  @IsBoolean({ message: "The field 'is_active' must be a boolean value." })
  is_active?: boolean;
}

/**
 * DTO used to capture and validate route parameters, for example: /customers/:id
 *
 * This ensures that the provided ID is present and properly formatted.
 */
export class GetCustomerParamsDto {
  // Customer ID from the URL parameter (always required and must be a string)
  @IsNotEmpty({ message: "Customer ID is required." })
  @IsString({ message: "Customer ID must be a string." })
  id!: string;
}

/**
 * DTO used to validate and transform query parameters for filtering customers
 * (endpoint: GET /customers?is_active=true&name=Jane)
 */
export class GetCustomerQueryDto {
  // Optional filter by active state (true/false)
  @IsOptional()
  @IsBoolean({ message: "The field 'is_active' must be a boolean value." })
  is_active?: boolean;

  // Optional filter by name
  @IsOptional()
  @IsString({ message: "Name must be a string." })
  name?: string;
}

/**
 * Standardized response DTO for returning customer data to the client.
 *
 * This defines how a customer object is structured in API responses.
 */
export class CustomerResponseDto {
  id_customer!: number;
  identification!: string;
  name!: string;
  email!: string;
  is_active!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
}

export class SearchCustomerDto {
  // The customer's identification number is required for the search.
  // This ensures that the client provides a value when calling the endpoint.
  @IsNotEmpty({ message: "Identification is required." })

  // Ensures the provided value is a string (not a number, object, etc.)
  @IsString({ message: "Identification must be a string." })

  // Restricts the identification length to be between 6 and 20 characters
  // to prevent invalid or incomplete IDs.
  @Length(6, 20, {
    message: "Identification must be between 6 and 20 characters.",
  })

  // The non-null assertion (!) tells TypeScript that this field will always be initialized.
  identification!: string;
}

/**
 * Swagger OpenAPI documentation — defines the schema for each DTO.
 *
 * These definitions are used by Swagger UI to automatically generate
 * interactive API documentation.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateCustomerDto:
 *       type: object
 *       required:
 *         - identification
 *         - name
 *         - email
 *       properties:
 *         identification:
 *           type: string
 *           example: "123456789"
 *           description: Unique identification number of the customer.
 *         name:
 *           type: string
 *           example: "Jane Doe"
 *           description: Full name of the customer.
 *         email:
 *           type: string
 *           example: "jane.doe@example.com"
 *           description: Valid email address of the customer.
 *
 *     UpdateCustomerDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Jane Smith"
 *           description: Updated name of the customer.
 *         email:
 *           type: string
 *           example: "jane.smith@example.com"
 *           description: Updated email address.
 *         is_active:
 *           type: boolean
 *           example: true
 *           description: Indicates whether the customer is active.
 *
 *     GetCustomerParamsDto:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *           example: "42"
 *           description: Unique customer ID provided in the URL path.
 *     
 *     SearchCustomerDto:
 *      type: object
 *      required:
 *        - identification
 *      properties:
 *        identification:
 *           type: string
 *           example: "1029384756"
 *           description: "Customer identification (cédula) to search"
 *
 *     GetCustomerQueryDto:
 *       type: object
 *       properties:
 *         is_active:
 *           type: boolean
 *           example: true
 *           description: Filter customers by active status.
 *         name:
 *           type: string
 *           example: "Jane"
 *           description: Filter customers by name.
 *
 *     CustomerResponseDto:
 *       type: object
 *       properties:
 *         id_customer:
 *           type: integer
 *           example: 1
 *           description: Unique customer identifier.
 *         identification:
 *           type: string
 *           example: "987654321"
 *           description: Customer’s identification number.
 *         name:
 *           type: string
 *           example: "Jane Doe"
 *           description: Full name of the customer.
 *         email:
 *           type: string
 *           example: "jane.doe@example.com"
 *           description: Customer’s email address.
 *         is_active:
 *           type: boolean
 *           example: true
 *           description: Indicates if the customer account is active.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-10-17T14:52:00Z"
 *           description: Date when the customer was created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-10-17T18:00:00Z"
 *           description: Date when the customer record was last updated.
 */
