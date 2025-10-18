// app/src/models/stock.model.ts

// Import necessary types and classes from Sequelize
import { DataTypes, Model, Optional } from "sequelize";
// Import the configured Sequelize instance
import sequelize from "../config/db";

// Interface representing all attributes of a Stock record
export interface StockAttributes {
    id_stock: number;       // Primary key of the stock record
    storehouse_id: number;  // Foreign key referencing the Storehouse
    product_id: number;     // Foreign key referencing the Product
    quantity: number;       // Quantity of the product in the storehouse
}

// Interface for attributes required during creation
// 'id_stock' is optional when creating a new stock record
export interface StockCreationAttributes extends Optional<StockAttributes, 'id_stock'>{};

// Define the Stock model class
export class Stock extends Model<StockAttributes, StockCreationAttributes> implements StockAttributes {
    public id_stock!: number;       // Primary key
    public storehouse_id!: number;  // Storehouse foreign key
    public product_id!: number;     // Product foreign key
    public quantity!: number;       // Quantity
    public readonly createdAt!: Date; // Timestamp for creation
    public readonly UpdatedAt!: Date; // Timestamp for updates (note: should be updatedAt)
}

// Initialize the model and define its schema
Stock.init({
    id_stock: {
        type: DataTypes.INTEGER,  // Integer type
        autoIncrement: true,      // Auto-increment primary key
        primaryKey: true          // Set as primary key
    },
    storehouse_id: {
        type: DataTypes.INTEGER,  // Integer type
        references: {             // Foreign key reference
            model: 'storehouses', // References the 'storehouses' table
            key: 'id_storehouse'  // References the 'id_storehouse' column
        }
    },
    product_id: {
        type: DataTypes.INTEGER,  // Integer type
        references: {             // Foreign key reference
            model: 'products',    // References the 'products' table
            key: 'id_product'     // References the 'id_product' column
        }
    },
    quantity: {
        type: DataTypes.INTEGER,  // Integer type
        allowNull: false          // Required field
    }
}, {
    sequelize,           // Pass the Sequelize instance
    modelName: 'Stock',  // Name of the model in Sequelize
    tableName: 'stock',  // Name of the table in the database
    timestamps: true     // Automatically manage createdAt and updatedAt
});

// Export the Stock model for use in other modules
export default Stock;
