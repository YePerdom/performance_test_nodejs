import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AuthDAO } from '../dao/user.dao';
import { LoginUserDto, CreateUserDto } from '../dto/user.dto';

// Get JWT secret key from environment variables
const JWT_SECRET = process.env.JWT_SECRET!;

/**
 * Register a new user
 * @param req - Express request object containing CreateUserDto in body
 * @param res - Express response object
 */
export const register = async (req: Request, res: Response) => {
    try {
        const data: CreateUserDto = req.body;

        // Check if a user with the same email already exists
        const existingUser = await AuthDAO.findByEmail(data.email);
        if (existingUser)
            return res.status(400).json({ message: 'Email already exists.' });

        // Create a new user
        const newUser = await AuthDAO.createUser(data);

        // Respond with success message and the user's name
        return res.status(201).json({
            message: 'User created successfully.',
            user: newUser.name
        });
    } catch (error) {
        // Handle unexpected errors
        return res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : 'Unexpected error occurred'
        });
    }
};

/**
 * User login
 * @param req - Express request object containing LoginUserDto in body
 * @param res - Express response object
 */
export const login = async (req: Request, res: Response) => {
    try {
        const data: LoginUserDto = req.body;

        // Find user by email
        const user = await AuthDAO.findByEmail(data.email);
        if (!user)
            return res.status(400).json({ message: 'Invalid credentials.' });

        // Validate password
        const isValidPassword = await AuthDAO.validatePassword(data.password, user.password);
        if (!isValidPassword)
            return res.status(401).json({ message: 'Invalid credentials.' });

        // Generate JWT token with 1-hour expiration
        const token = jwt.sign(
            { id: user.id_user, name: user.name, rol: user.rol},
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Respond with success message, user name, and JWT token
        return res.status(200).json({
            token,
            message: 'Login successful.',
            user: user.name
        });
    } catch (error) {
        // Handle unexpected errors
        return res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : 'Unexpected error occurred'
        });
    }
};
