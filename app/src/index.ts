// app/src/index.ts

// Import the Express app instance
import app from "./server";
// Import the database connection function
import { dbConnection } from "./models";

// Read host and port from environment variables
const PORT = process.env.APP_PORT;
const HOST = process.env.APP_HOST;

// Define an asynchronous function to start the server
const start = async () => {
    try {
        // Connect to the database and synchronize models
        await dbConnection();

        // Start the Express server and listen on the specified port
        app.listen(PORT, () => {
            console.log(`Server listening on ${HOST}${PORT}`); // Log server URL
            console.log(`Swagger UI available at: ${HOST}${PORT}/api-docs`); // Log Swagger UI URL
        });
    } catch (error) {
        // Log any error that occurs and exit the process
        console.error('Failed to launch server', error);
        process.exit(1);
    }
}

// Call the start function to initialize the database and start the server
start();
