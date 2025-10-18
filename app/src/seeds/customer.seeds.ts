// app/src/seeds/customer.seeds.ts

// Import Node.js modules for file system operations and path handling
import fs from "fs";
import path from "path";
// Import CSV parsing function
import { parse } from "csv-parse/sync";
// Import the Customer model and its creation attributes type
import { Customer } from "../models";
import { CustomerCreationAttributes } from "../models/customer.model";

// Define an asynchronous function to seed customers into the database
export const seedCustomer = async () => {
    // Build the file path to the CSV file containing customer data
    const filePath = path.join(__dirname, '../data/customer.csv');

    // Read the CSV file contents as a UTF-8 string
    const fileData = fs.readFileSync(filePath, 'utf-8');

    // Parse the CSV string into an array of CustomerCreationAttributes objects
    // `columns: true` maps CSV headers to object keys
    // `skipEmptyLines: true` ignores empty lines in the CSV
    const customers = parse<CustomerCreationAttributes>(fileData, { columns: true, skipEmptyLines: true });

    // Insert the customers into the database in bulk
    // `ignoreDuplicates: true` ensures rows with existing unique keys (like email or ID) are skipped
    await Customer.bulkCreate(customers, {
        ignoreDuplicates: true
    });

    // Log a success message
    console.log('Customers inserted successfully.');
}
