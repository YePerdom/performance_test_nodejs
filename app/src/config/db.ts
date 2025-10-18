// app/src/config/db.ts

// Import the Sequelize constructor from the 'sequelize' library
import { Sequelize } from 'sequelize';
// Import environment variables from a .env file using the 'dotenv' package
import 'dotenv/config';

// Destructure the relevant PostgreSQL connection variables from process.env
const { POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT } = process.env;

// Create a new Sequelize instance, which represents a connection to the PostgreSQL database
const sequelize = new Sequelize(
  POSTGRES_DB as string,   // Name of the database
  POSTGRES_USER as string, // Database username
  POSTGRES_PASSWORD,       // Database password
  {
    host: POSTGRES_HOST,               // Database host (e.g., 'localhost' or an IP address)
    port: parseInt(POSTGRES_PORT!, 10), // Database port, converted from string to number
    dialect: "postgres",               // The SQL dialect to use (PostgreSQL in this case)
    logging: false,                    // Disable SQL query logging in the console
  }
);

// Export the Sequelize instance so it can be used throughout the application
export default sequelize;
