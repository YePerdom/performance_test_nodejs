// Import the database connection function
import { dbConnection } from "../models";
// Import individual seeding functions for each model
import { seedUsers } from "./user.seeds";
import { seedAddress } from "./address.seeds";
import { seedCustomer } from "./customer.seeds";
import { seedOrder } from "./order.seeds";
import { seedOrderDetail } from "./orderDetail.seeds";
import { seedProduct } from "./product.seeds";
import { seedStock } from "./stock.seeds";
import { seedStorehouse } from "./storehouse.seeds";

// Define an asynchronous function to run all seeders in order
const runSeeds = async () => {
    try {
        console.log('Starting the seed process...');

        // Connect to the database
        await dbConnection();

        // Execute seed functions in a specific order to respect foreign key dependencies
        await seedUsers();        // Users first because they may create orders
        await seedCustomer();     // Customers before addresses or orders
        await seedAddress();      // Addresses reference customers
        await seedStorehouse();   // Storehouses before stocks and orders
        await seedProduct();      // Products before stocks and order details
        await seedStock();        // Stocks reference storehouses and products
        await seedOrder();        // Orders reference customers, addresses, storehouses, and users
        await seedOrderDetail();  // OrderDetails reference orders and products

        console.log('All seeds executed successfully');
        process.exit(0); // Exit successfully
    } catch (error) {
        // Log any errors and exit with failure code
        console.error('Error executing seeds:', error);
        process.exit(1)
    }
}

// Run the seeding process
runSeeds();
