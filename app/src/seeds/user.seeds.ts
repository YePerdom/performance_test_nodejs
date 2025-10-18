// Import Node.js modules for file system and path handling
import fs from "fs";
import path from "path";
// Import CSV parsing function
import { parse } from "csv-parse/sync";
// Import the User model and its creation attributes type
import { User } from "../models";
import { UserCreationAttributes } from "../models/user.model";

// Define an asynchronous function to seed users into the database
export const seedUsers = async () => {
    // Build the file path to the CSV file containing user data
    const filePath = path.join(__dirname, '../data/user.csv');

    // Read the CSV file contents as a UTF-8 string
    const fileData = fs.readFileSync(filePath, 'utf-8');

    // Parse the CSV string into an array of UserCreationAttributes objects
    // `columns: true` maps CSV headers to object keys
    // `skip_empty_lines: true` ignores empty lines
    const users = parse<UserCreationAttributes>(fileData, { columns: true, skip_empty_lines: true });

    // Insert the user records into the database in bulk
    // `ignoreDuplicates: true` ensures rows with existing primary keys or unique fields (like email) are skipped
    await User.bulkCreate(users, {
        ignoreDuplicates: true
    });

    // Log a success message
    console.log('Users inserted successfully.');
}
