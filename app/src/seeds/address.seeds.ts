// app/src/seeds/address.seeds.ts

// Import Node.js modules for file system operations and path manipulation
import fs from "fs";
import path from "path";
// Import CSV parsing function
import { parse } from "csv-parse/sync";
// Import the Address model and its creation attributes type
import { Address } from "../models";
import { AddressCreationAttributes } from "../models/address.model";

// Define an asynchronous function to seed addresses into the database
export const seedAddress = async () => {
    // Build the file path to the CSV file containing address data
    const filePath = path.join(__dirname, '../data/address.csv');

    // Read the CSV file contents as a string
    const fileData = fs.readFileSync(filePath, 'utf-8');

    // Parse the CSV string into an array of AddressCreationAttributes
    // `columns: true` maps CSV headers to object keys
    // `skipEmptyLines: true` ignores empty lines in the CSV
    const Addresses = parse<AddressCreationAttributes>(fileData, { columns: true, skipEmptyLines: true });

    // Insert the addresses into the database in bulk
    // `ignoreDuplicates: true` skips any rows that would violate unique constraints
    await Address.bulkCreate(Addresses, {
        ignoreDuplicates: true
    });

    // Log a success message
    console.log('Addresses inserted successfully.');
}
