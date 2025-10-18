// Import Node.js modules for file system and path handling
import fs from "fs";
import path from "path";
// Import CSV parsing function
import { parse } from "csv-parse/sync";
// Import the Product model and its creation attributes type
import { Product } from "../models";
import { ProductCreationAttributes } from "../models/product.model";

// Define an asynchronous function to seed products into the database
export const seedProduct = async () => {
    // Build the file path to the CSV file containing product data
    const filePath = path.join(__dirname, '../data/product.csv');

    // Read the CSV file contents as a UTF-8 string
    const fileData = fs.readFileSync(filePath, 'utf-8');

    // Parse the CSV string into an array of ProductCreationAttributes objects
    // `columns: true` maps CSV headers to object keys
    // `skip_empty_lines: true` ignores empty lines in the CSV
    const Products = parse<ProductCreationAttributes>(fileData, { columns: true, skip_empty_lines: true });

    // Insert the products into the database in bulk
    // `ignoreDuplicates: true` ensures rows with existing primary keys or unique fields are skipped
    await Product.bulkCreate(Products, {
        ignoreDuplicates: true
    });

    // Log a success message
    console.log('Products inserted successfully.');
}
