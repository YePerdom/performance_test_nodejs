// app/src/models/order.model.ts

// Import necessary types and classes from Sequelize
import { DataTypes, Model, Optional } from "sequelize";
// Import the configured Sequelize instance
import sequelize from "../config/db";

// Interface representing all attributes of an Order
export interface OrderAttributes {
    id_order: number;       // Primary key of the order
    customer_id: number;    // Foreign key referencing the Customer who placed the order
    address_id: number;     // Foreign key referencing the Address for delivery
    storehouse_id: number;  // Foreign key referencing the Storehouse fulfilling the order
    status: string;         // Status of the order (e.g., pending, in transit, delivered)
    created_by: number;     // Foreign key referencing the User who created the order
}

// Interface for attributes required during creation
// 'id_order' and 'status' are optional when creating a new order
export interface OrderCreationAttributes extends Optional<OrderAttributes, 'id_order' | 'status'>{}

// Define the Order model class
export class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes{
    public id_order!: number;       // Primary key
    public customer_id!: number;    // Customer foreign key
    public address_id!: number;     // Address foreign key
    public storehouse_id!: number;  // Storehouse foreign key
    public status!: string;         // Order status
    public created_by!: number;     // User foreign key
    public readonly createdAt!: Date; // Timestamp for creation
    public readonly updatedAt!: Date; // Timestamp for updates
}

// Initialize the model and define its schema
Order.init({
    id_order: {
        type: DataTypes.INTEGER,   // Integer type
        autoIncrement: true,       // Auto-increment primary key
        primaryKey: true           // Set as primary key
    },
    customer_id: {
        type: DataTypes.INTEGER,   // Integer type
        references: {              // Foreign key reference
            model: 'customers',    // References the 'customers' table
            key: 'id_customer'     // References the 'id_customer' column
        }
    },
    address_id: {
        type: DataTypes.INTEGER,   // Integer type
        references: {              // Foreign key reference
            model: 'addresses',    // References the 'addresses' table
            key: 'id_address'      // References the 'id_address' column
        }
    },
    storehouse_id: {
        type: DataTypes.INTEGER,   // Integer type
        references: {              // Foreign key reference
            model: 'storehouses',  // References the 'storehouses' table
            key: 'id_storehouse'   // References the 'id_storehouse' column
        }
    },
    created_by: {
        type: DataTypes.INTEGER,   // Integer type
        references: {              // Foreign key reference
            model: 'users',        // References the 'users' table
            key: 'id_user'         // References the 'id_user' column
        }
    },
    status: {
        type: DataTypes.ENUM('pending', 'in transit', 'delivered'), // Enum type for status
        allowNull: false,           // Required field
        defaultValue: 'pending'     // Default status is 'pending'
    }
}, {
    sequelize,         // Pass the Sequelize instance
    modelName: 'Order', // Name of the model in Sequelize
    tableName: 'orders', // Name of the table in the database
    timestamps: true     // Automatically manage createdAt and updatedAt
});

// Export the Order model for use in other modules
export default Order;
