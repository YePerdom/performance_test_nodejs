// Import the User model from Sequelize
import { User } from '../models';
// Import DTOs and enums for type safety
import { CreateUserDto, UserRole } from '../dto/user.dto';
// Import bcryptjs for password hashing and verification
import bcrypt from 'bcryptjs';

/**
 * Data Access Object (DAO) for user authentication and management.
 * Handles database operations related to user registration, retrieval, and password validation.
 */
export class AuthDAO {
  
    /**
     * Find a user by email.
     * @param email - Email address of the user
     * @returns A User instance if found, or null if not found
     */
    static async findByEmail(email: string): Promise<User | null> {
        return await User.findOne({ where: { email } });
    }

    /**
     * Create a new user in the database.
     * - Hashes the password before saving.
     * - Assigns a default role of 'analista' if no role is provided.
     * @param data - DTO containing user creation data
     * @returns The newly created User instance
     */
    static async createUser(data: CreateUserDto): Promise<User> { 
        // Hash the password with a salt of 10 rounds
        const hashedPassword = await bcrypt.hash(data.password, 10);
        // Set the role, defaulting to ANALISTA if not provided
        const role = data.rol ?? UserRole.ANALISTA;

        // Create the new user record in the database
        const newUser = await User.create({
            name: data.name,
            email: data.email,
            password: hashedPassword,
            rol: role
        });

        return newUser;
    }

    /**
     * Validate a plain text password against a hashed password.
     * @param password - Plain text password input by the user
     * @param hashedPassword - Stored hashed password from the database
     * @returns Boolean indicating if the password matches
     */
    static async validatePassword(password: string, hashedPassword: string){
        return await bcrypt.compare(password, hashedPassword);
    }
}
