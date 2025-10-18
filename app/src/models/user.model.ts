// app/src/models/user.model.ts

// Import necessary types and classes from Sequelize
import { DataTypes, Model, Optional } from "sequelize";
// Import the configured Sequelize instance
import sequelize from "../config/db";

// Interface representing all attributes of a User
export interface UserAttributes {
    id_user: number;    // Primary key of the user
    name: string;       // Full name of the user
    email: string;      // Unique email address
    password: string;   // User password (hashed)
    rol: string;        // Role of the user (e.g., admin, analista)
    is_active: boolean; // Indicates if the user is active
}

// Interface for attributes required during creation
// 'id_user' and 'is_active' are optional when creating a new user
export interface UserCreationAttributes extends Optional<UserAttributes,'id_user' | 'is_active'>{}

// Define the User model class
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes{
    public id_user!: number;      // Primary key
    public name!: string;         // Name
    public email!: string;        // Email
    public password!: string;     // Password
    public rol!: string;          // Role
    public is_active!: boolean;   // Active status
    public readonly createdAt!: Date; // Timestamp for creation
    public readonly updatedAt!: Date; // Timestamp for updates
}

// Initialize the model and define its schema
User.init({
    id_user: {
        type: DataTypes.INTEGER, // Integer type
        primaryKey: true,        // Set as primary key
        autoIncrement: true      // Auto-increment
    },
    name: {
        type: DataTypes.STRING,  // String type
        allowNull: false         // Required field
    },
    email: {
        type: DataTypes.STRING,  // String type
        unique: true,            // Must be unique
        allowNull: false         // Required field
    },
    password: {
        type: DataTypes.STRING,  // String type
        allowNull: false         // Required field
    },
    rol: {
        type: DataTypes.ENUM('admin','analista'), // Enum type for role
        allowNull: false                          // Required field
    },
    is_active: {
        type: DataTypes.BOOLEAN, // Boolean type
        allowNull: false,        // Required field
        defaultValue: true       // Default value is true
    }
},{
    sequelize,           // Pass the Sequelize instance
    modelName: 'User',   // Name of the model in Sequelize
    tableName: 'users',  // Name of the table in the database
    timestamps: true     // Automatically manage createdAt and updatedAt
});

// Export the User model for use in other modules
export default User;
