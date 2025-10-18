// app/src/models/storehouse.model.ts

// Import necessary types and classes from Sequelize
import { DataTypes, Model, Optional } from "sequelize";

// Import the configured Sequelize instance
import sequelize from "../config/db";

// Interface representing all attributes of a Storehouse
export interface StorehouseAttributes {
    id_storehouse: number; // Primary key of the storehouse
    name: string;          // Name of the storehouse
    address: string;       // Physical address of the storehouse
    is_active: boolean;    // Indicates if the storehouse is active
}

// Interface for attributes required during creation
// 'id_storehouse' and 'is_active' are optional when creating a new storehouse
export interface StorehouseCreationAttributes extends Optional<StorehouseAttributes, 'id_storehouse' | 'is_active'> { }

// Define the Storehouse model class
export class Storehouse extends Model<StorehouseAttributes, StorehouseCreationAttributes> implements StorehouseAttributes {
    public id_storehouse!: number; // Primary key
    public name!: string;          // Storehouse name
    public address!: string;       // Storehouse address
    public is_active!: boolean;    // Active status
    public readonly createdAt!: Date; // Timestamp for creation
    public readonly updatedAt!: Date; // Timestamp for updates
}

// Initialize the model and define its schema
Storehouse.init({
    id_storehouse: {
        type: DataTypes.INTEGER,  // Integer type
        autoIncrement: true,      // Auto-increment primary key
        primaryKey: true          // Set as primary key
    },
    name: {
        type: DataTypes.STRING,   // String type
        allowNull: false          // Required field
    },
    address: {
        type: DataTypes.STRING,   // String type
        allowNull: false          // Required field
    },
    is_active: {
        type: DataTypes.BOOLEAN,  // Boolean type
        allowNull: false,         // Required field
        defaultValue: true        // Default value is true
    }
}, {
    sequelize,           // Pass the Sequelize instance
    modelName: 'Storehouse', // Name of the model in Sequelize
    tableName: 'storehouses', // Name of the table in the database
    timestamps: true        // Automatically manage createdAt and updatedAt
});

// Export the Storehouse model for use in other modules
export default Storehouse;
