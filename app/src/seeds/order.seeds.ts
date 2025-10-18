// Import Node.js modules for file system and path handling
import fs from "fs";
import path from "path";
// Import CSV parsing function
import { parse } from "csv-parse/sync";
// Import the Order model and its creation attributes type
import { Order } from "../models";
import { OrderCreationAttributes } from "../models/order.model";

// Define an asynchronous function to seed orders into the database
export const seedOrder = async () => {
    // Build the file path to the CSV file containing order data
    const filePath = path.join(__dirname, '../data/order.csv');

    // Read the CSV file contents as a UTF-8 string
    const fileData = fs.readFileSync(filePath, 'utf-8');

    // Parse the CSV string into an array of OrderCreationAttributes objects
    // `columns: true` maps CSV headers to object keys
    // `skipEmptyLines: true` ignores empty lines
    const orders = parse<OrderCreationAttributes>(fileData, { columns: true, skipEmptyLines: true });

    // Insert the orders into the database in bulk
    // `ignoreDuplicates: true` ensures that rows with duplicate primary keys are skipped
    await Order.bulkCreate(orders, {
        ignoreDuplicates: true
    });

    // Log a success message
    console.log('Orders inserted successfully.');
}
