// app/src/config/swagger.ts

// Import swagger-jsdoc to generate Swagger/OpenAPI specification from JSDoc comments
import swaggerJSDoc from "swagger-jsdoc";
// Import swagger-ui-express to serve Swagger UI in an Express app
import swaggerUi from "swagger-ui-express";
// Import Express type for typing the app parameter
import { Express } from "express";

// Read host and port from environment variables
const HOST = process.env.APP_HOST;
const PORT = process.env.APP_PORT;

// Swagger-jsdoc options
const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0", // OpenAPI version
    info: {
      title: "FHL API", // API title
      version: "1.0.0", // API version
      description:
        "API documentation for delvey management system", // Description of the API
    },
    servers: [
      {
        url: `${HOST}${PORT}/api`, // Base URL for API endpoints
        description: "Development server", // Description of this server
      },
    ],
    components: {
      // Define reusable components like security schemes
      securitySchemes: {
        bearerAuth: {
          type: "http",       // Type of security
          scheme: "bearer",   // Use bearer authentication
          bearerFormat: "JWT" // JWT token format
        },
      },
    },
    security: [
      {
        bearerAuth: [], // Apply the bearerAuth security scheme globally to all endpoints
      },
    ],
  },
  // Paths to files containing JSDoc comments for routes and DTOs
  apis: ["./src/routes/*.ts", "./src/dto/*.ts"],
};

// Generate the Swagger specification from the options
const swaggerSpec = swaggerJSDoc(options);

// Export a function to set up Swagger UI in an Express app
export const swaggerDoc = (app: Express) => {
  // Serve Swagger UI at the /api-docs endpoint
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
