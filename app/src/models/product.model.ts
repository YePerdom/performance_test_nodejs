// app/src/models/product.model.ts

// Import necessary types and classes from Sequelize
import { DataTypes, Model, Optional } from "sequelize";
// Import the configured Sequelize instance
import sequelize from "../config/db";

// Interface representing all attributes of a Product
export interface ProductAttributes {
    id_product: number;   // Primary key of the product
    code: string;         // Product code (e.g., SKU)
    name: string;         // Name of the product
    description: string;  // Description of the product
    price: number;        // Price of the product
    is_active: boolean;   // Indicates if the product is active
}

// Interface for attributes required during creation
// 'id_product' and 'is_active' are optional when creating a new product
export interface ProductCreationAttributes extends Optional<ProductAttributes, 'id_product' | 'is_active'> { }

// Define the Product model class
export class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
    public id_product!: number;   // Primary key
    public code!: string;         // Product code
    public name!: string;         // Name
    public description!: string;  // Description
    public price!: number;        // Price
    public is_active: boolean;    // Active status
    public readonly createdAt!: Date; // Timestamp for creation
    public readonly updateAt!: Date;  // Timestamp for updates (note: should be updatedAt)
}

// Initialize the model and define its schema
Product.init({
    id_product: {
        type: DataTypes.INTEGER,   // Integer type
        primaryKey: true,          // Set as primary key
        autoIncrement: true        // Auto-increment
    },
    code: {
        type: DataTypes.STRING,    // String type
        allowNull: false           // Required field
    },
    name: {
        type: DataTypes.STRING,    // String type
        allowNull: false           // Required field
    },
    description: {
        type: DataTypes.STRING,    // String type
        allowNull: false           // Required field
    },
    price: {
        type: DataTypes.DECIMAL(10, 2), // Decimal with 2 decimal places
        allowNull: false                 // Required field
    },
    is_active: {
        type: DataTypes.BOOLEAN,   // Boolean type
        allowNull: false,          // Required field
        defaultValue: true         // Default value is true
    }
}, {
    sequelize,          // Pass the Sequelize instance
    modelName: 'Product', // Name of the model in Sequelize
    tableName: 'products', // Name of the table in the database
    timestamps: true      // Automatically manage createdAt and updatedAt
});

// Export the Product model for use in other modules
export default Product;
