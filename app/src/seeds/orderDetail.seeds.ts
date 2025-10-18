// Import Node.js modules for file system and path handling
import fs from "fs";
import path from "path";
// Import CSV parsing function
import { parse } from "csv-parse/sync";
// Import the OrderDetail model and its creation attributes type
import { OrderDetail } from "../models";
import { OrderDetailCreationAttributes } from "../models/orderDetail.model";

// Define an asynchronous function to seed order details into the database
export const seedOrderDetail = async () => {
    // Build the file path to the CSV file containing order detail data
    const filePath = path.join(__dirname, '../data/orderDetail.csv');

    // Read the CSV file contents as a UTF-8 string
    const fileData = fs.readFileSync(filePath, 'utf-8');

    // Parse the CSV string into an array of OrderDetailCreationAttributes objects
    // `columns: true` maps CSV headers to object keys
    // `skipEmptyLines: true` ignores empty lines
    const orderDetails = parse<OrderDetailCreationAttributes>(fileData, { columns: true, skipEmptyLines: true });

    // Insert the order details into the database in bulk
    // `ignoreDuplicates: true` ensures rows with duplicate primary keys are skipped
    await OrderDetail.bulkCreate(orderDetails, {
        ignoreDuplicates: true
    });

    // Log a success message
    console.log('OrderDetails inserted successfully.');
}
