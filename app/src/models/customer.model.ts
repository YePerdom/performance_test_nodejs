// app/src/models/customer.model.ts

// Import necessary types and classes from Sequelize
import { DataTypes, Model, Optional } from "sequelize";
// Import the configured Sequelize instance
import sequelize from "../config/db";

// Interface representing all attributes of a Customer
export interface CustomerAttributes {
    id_customer: number;      // Primary key of the customer
    identification: string;   // Unique identification number (e.g., ID card)
    name: string;             // Customer's name
    email: string;            // Customer's email (unique)
    is_active: boolean;       // Indicates if the customer is active
}

// Interface for attributes required during creation
// 'id_customer' and 'is_active' are optional when creating a new customer
export interface CustomerCreationAttributes extends Optional<CustomerAttributes, 'id_customer' | 'is_active'> { }

// Define the Customer model class
export class Customer extends Model<CustomerAttributes, CustomerCreationAttributes> implements CustomerAttributes {
    public id_customer!: number;      // Primary key
    public identification!: string;   // Identification number
    public name!: string;             // Name
    public email!: string;            // Email
    public is_active!: boolean;       // Active status
    public readonly createdAt!: Date; // Timestamp for creation
    public readonly updatedAt!: Date; // Timestamp for updates
}

// Initialize the model with its schema
Customer.init({
    id_customer: {
        type: DataTypes.INTEGER,  // Integer type
        autoIncrement: true,      // Auto-increment primary key
        primaryKey: true          // Set as primary key
    },
    identification: {
        type: DataTypes.STRING(20), // String with max length 20
        unique: true,               // Must be unique
        allowNull: false            // Required field
    },
    name: {
        type: DataTypes.STRING(50), // String with max length 50
        allowNull: false            // Required field
    },
    email: {
        type: DataTypes.STRING(100), // String with max length 100
        unique: true,                // Must be unique
        allowNull: false             // Required field
    },
    is_active: {
        type: DataTypes.BOOLEAN,     // Boolean type
        allowNull: false,            // Required field
        defaultValue: true           // Default value is true
    }
}, {
    sequelize,           // Pass the Sequelize instance
    modelName: 'Customer', // Name of the model in Sequelize
    tableName: "customers", // Name of the table in the database
    timestamps: true       // Automatically manage createdAt and updatedAt
});

// Export the Customer model for use in other modules
export default Customer;
