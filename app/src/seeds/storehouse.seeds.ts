// Import Node.js modules for file system and path handling
import fs from "fs";
import path from "path";
// Import CSV parsing function
import { parse } from "csv-parse/sync";
// Import the Storehouse model and its creation attributes type
import { Storehouse } from "../models";
import { StorehouseCreationAttributes } from "../models/storehouse.model";

// Define an asynchronous function to seed storehouses into the database
export const seedStorehouse = async () => {
    // Build the file path to the CSV file containing storehouse data
    const filePath = path.join(__dirname, '../data/storehouse.csv');

    // Read the CSV file contents as a UTF-8 string
    const fileData = fs.readFileSync(filePath, 'utf-8');

    // Parse the CSV string into an array of StorehouseCreationAttributes objects
    // `columns: true` maps CSV headers to object keys
    // `skip_empty_lines: true` ignores empty lines
    const storehouses = parse<StorehouseCreationAttributes>(fileData, { columns: true, skip_empty_lines: true });

    // Insert the storehouse records into the database in bulk
    // `ignoreDuplicates: true` ensures rows with existing primary keys are skipped
    await Storehouse.bulkCreate(storehouses, {
        ignoreDuplicates: true
    });

    // Log a success message
    console.log('Storehouses inserted successfully.');
}
