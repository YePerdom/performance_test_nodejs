// app/src/server.ts

// Import the Express framework
import express from 'express';
// Import the CORS middleware to handle Cross-Origin Resource Sharing
import cors from 'cors';
// Import express-jwt to handle JWT authentication
import { expressjwt } from "express-jwt";
// Import the Swagger setup function
import { swaggerDoc } from './docs/swagger';
// Import the authentication routes module from the 'routes' directory
import authRoutes from './routes/auth.router';
// Import the routes that handle all Customer-related endpoints
import customerRoutes from "./routes/customer.router";

// Create a new Express application instance
const app = express();
// Read the JWT secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET!;

// Enable CORS for all routes, allowing requests from any origin
app.use(cors());

// Enable parsing of JSON request bodies
app.use(express.json());

// Apply JWT authentication middleware to all routes under /api
// Exclude the registration and login routes from authentication
app.use(
  "/api",
  expressjwt({ secret: JWT_SECRET, algorithms: ["HS256"] }).unless({
    path: ["/api/auth/register", "/api/auth/login"],
  })
);

// Mount the 'authRoutes' router at the '/api/auth' base path
app.use("/api/auth", authRoutes);
// Register the Customer routes under the "/api/customers" base path
app.use("/api/customers", customerRoutes);

// Set up Swagger documentation for the app
swaggerDoc(app);

// Export the Express app instance so it can be imported and used elsewhere
export default app;
