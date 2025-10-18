// app/src/models/index.ts

// Import the configured Sequelize instance
import sequelize from "../config/db";
// Import all models
import Address from "./address.model";
import Customer from "./customer.model";
import Order from "./order.model";
import OrderDetail from "./orderDetail.model";
import Product from "./product.model";
import Stock from "./stock.model";
import Storehouse from "./storehouse.model";
import User from "./user.model";
// Import the function that defines all model associations
import { associations } from "./associations";

// Call the associations function to set up all relationships
associations();

// Define an asynchronous function to connect to the database
const dbConnection = async () => {
    try {
        // Try to authenticate the connection
        await sequelize.authenticate();
        console.log('Connection database established.'); // Log success

        // Synchronize all defined models with the database tables
        await sequelize.sync();
        console.log('Database synchronized.'); // Log success
    } catch (error) {
        // Log any error and exit the process with code 1
        console.error('Error connecting to database', error);
        process.exit(1);
    }
}

// Export the Sequelize instance, all models, and the connection function
export {
    sequelize,
    Address,
    Customer,
    Order,
    OrderDetail,
    Product,
    Stock,
    Storehouse,
    User,
    dbConnection
}
