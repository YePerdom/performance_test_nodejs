// Import Node.js modules for file system and path handling
import fs from "fs";
import path from "path";
// Import CSV parsing function
import { parse } from "csv-parse/sync";
// Import the Stock model and its creation attributes type
import { Stock } from "../models";
import { StockCreationAttributes } from "../models/stock.model";

// Define an asynchronous function to seed stock data into the database
export const seedStock = async () => {
    // Build the file path to the CSV file containing stock data
    const filePath = path.join(__dirname, '../data/stock.csv');

    // Read the CSV file contents as a UTF-8 string
    const fileData = fs.readFileSync(filePath, 'utf-8');

    // Parse the CSV string into an array of StockCreationAttributes objects
    // `columns: true` maps CSV headers to object keys
    // `skip_empty_lines: true` ignores empty lines
    const stocks = parse<StockCreationAttributes>(fileData, { columns: true, skip_empty_lines: true });

    // Insert the stock records into the database in bulk
    // `ignoreDuplicates: true` ensures rows with existing primary keys are skipped
    await Stock.bulkCreate(stocks, {
        ignoreDuplicates: true
    });

    // Log a success message
    console.log('Stocks inserted successfully.');
}
