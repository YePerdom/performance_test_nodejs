import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

/**
 * Middleware to validate incoming request bodies against a DTO (Data Transfer Object) class.
 * 
 * @param DTOClass - The DTO class to use for validation.
 * @returns An Express middleware function.
 */
export const validateDto = (DTOClass: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        // Convert the plain request body into an instance of the given DTO class.
        const dtoInstance = plainToInstance(DTOClass, req.body);

        // Validate the DTO instance using class-validator decorators.
        // The 'whitelist' option removes properties not defined in the DTO.
        const errors = await validate(dtoInstance, { whitelist: true });

        // If validation errors exist, format and return them in a 400 Bad Request response.
        if (errors.length > 0) {
            const formattedErrors = errors.map(error => ({
                field: error.property,          // The field that failed validation
                constraints: error.constraints  // The specific validation messages
            }));

            return res.status(400).json({
                message: 'Validation error',
                errors: formattedErrors
            });
        }

        // If validation passes, proceed to the next middleware or controller.
        next();
    };
};
