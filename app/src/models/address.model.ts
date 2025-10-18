// app/src/models/address.model.ts

// Import necessary types and classes from Sequelize
import { DataTypes, Model, Optional } from "sequelize";
// Import the configured Sequelize instance
import sequelize from "../config/db";

// Define the interface representing all attributes of an Address
export interface AddressAttributes {
    id_address: number;    // Primary key of the address
    customer_id: number;   // Foreign key referencing a customer
    address: string;       // The street address
    city: string;          // City name
    is_active: boolean;    // Indicates if the address is active
}

// Define an interface for attributes needed during creation
// 'id_address' and 'is_active' are optional when creating a new record
export interface AddressCreationAttributes extends Optional<AddressAttributes, 'id_address' |'is_active'> { }

// Define the Address model extending Sequelize's Model class
// It implements both AddressAttributes and AddressCreationAttributes
export class Address extends Model<AddressAttributes, AddressCreationAttributes> implements AddressAttributes {
    public id_address!: number;    // Primary key
    public customer_id!: number;   // Customer foreign key
    public address!: string;       // Street address
    public city!: string;          // City
    public is_active!: boolean;    // Active status
    public readonly createdAt!: Date;  // Timestamp for creation (auto-managed)
    public readonly updatedAt!: Date;  // Timestamp for updates (auto-managed)
}

// Initialize the model and define its schema
Address.init({
    id_address: {
        type: DataTypes.INTEGER,   // Integer type
        autoIncrement: true,       // Auto-incrementing primary key
        primaryKey: true           // Set as primary key
    },
    customer_id: {
        type: DataTypes.INTEGER,   // Integer type
        references: {              // Define foreign key relationship
            model: 'customers',    // Reference the 'customers' table
            key: 'id_customer'     // Reference the 'id_customer' column
        }
    },
    address: {
        type: DataTypes.STRING,    // String type
        allowNull: false           // Required field
    },
    city: {
        type: DataTypes.STRING(50), // String with max length 50
        allowNull: false            // Required field
    },
    is_active: {
        type: DataTypes.BOOLEAN,    // Boolean type
        allowNull: false,           // Required field
        defaultValue: true          // Default to true if not provided
    }
}, {
    sequelize,             // Pass the Sequelize instance
    modelName: 'Address',  // Model name in Sequelize
    tableName: 'addresses', // Name of the table in the database
    timestamps: true       // Automatically manage createdAt and updatedAt
});

// Export the Address model for use in other modules
export default Address;
