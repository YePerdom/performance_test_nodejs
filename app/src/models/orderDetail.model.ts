// app/src/models/orderDetail.model.ts

// Import necessary types and classes from Sequelize
import { DataTypes, Model, Optional } from "sequelize";
// Import the configured Sequelize instance
import sequelize from "../config/db";

// Interface representing all attributes of an OrderDetail
export interface OrderDetailAttributes {
    id_detail: number;   // Primary key of the order detail
    order_id: number;    // Foreign key referencing the associated Order
    product_id: number;  // Foreign key referencing the associated Product
    quantity: number;    // Quantity of the product in this order detail
    subtotal: number;    // Subtotal price for this order detail (quantity * product price)
}

// Interface for attributes required during creation
// 'id_detail' is optional when creating a new order detail
export interface OrderDetailCreationAttributes extends Optional<OrderDetailAttributes, 'id_detail'> { }

// Define the OrderDetail model class
export class OrderDetail extends Model<OrderDetailAttributes, OrderDetailCreationAttributes> implements OrderDetailAttributes {
    public id_detail!: number;   // Primary key
    public order_id!: number;    // Order foreign key
    public product_id!: number;  // Product foreign key
    public quantity!: number;    // Quantity
    public subtotal!: number;    // Subtotal
    public readonly createdAt!: Date; // Timestamp for creation
    public readonly updatedAt!: Date; // Timestamp for updates
}

// Initialize the model and define its schema
OrderDetail.init({
    id_detail: {
        type: DataTypes.INTEGER,   // Integer type
        autoIncrement: true,       // Auto-increment primary key
        primaryKey: true           // Set as primary key
    },
    order_id: {
        type: DataTypes.INTEGER,   // Integer type
        references: {              // Foreign key reference
            model: 'orders',       // References the 'orders' table
            key: 'id_order'        // References the 'id_order' column
        }
    },
    product_id: {
        type: DataTypes.INTEGER,   // Integer type
        references: {              // Foreign key reference
            model: 'products',     // References the 'products' table
            key: 'id_product'      // References the 'id_product' column
        }
    },
    quantity: {
        type: DataTypes.DECIMAL(10, 2), // Decimal type with 2 decimal places
        allowNull: false                 // Required field
    },
    subtotal: {
        type: DataTypes.DECIMAL(10, 2), // Decimal type with 2 decimal places
        allowNull: false                 // Required field
    }
}, {
    sequelize,            // Pass the Sequelize instance
    modelName: 'OrderDetail', // Name of the model in Sequelize
    tableName: 'orderDetail', // Name of the table in the database
    timestamps: true          // Automatically manage createdAt and updatedAt
});

// Export the OrderDetail model for use in other modules
export default OrderDetail;
