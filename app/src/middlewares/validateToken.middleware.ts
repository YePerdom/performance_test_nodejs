// src/middlewares/validateToken.middleware.ts

// Import required types and modules from Express and jsonwebtoken
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend the Express Request interface to include a `user` property
// This allows us to attach user information decoded from the JWT
export interface AuthRequest extends Request {
  user?: {
    id_user: number;
    name: string;
    email: string;
    rol: "admin" | "analista";
  };
}

/**
 * Middleware: validateToken
 * -----------------------------------
 * This middleware verifies the presence and validity of a JWT token.
 * It ensures that only authenticated users can access protected routes.
 *
 * Workflow:
 * 1. Checks for an Authorization header in the request.
 * 2. Extracts and verifies the JWT token.
 * 3. Decodes the token payload and attaches the user info to `req.user`.
 * 4. Calls `next()` to continue if the token is valid.
 * 5. Returns a 401 error if the token is missing, invalid, or expired.
 */
export const validateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // Retrieve the Authorization header (format: "Bearer <token>")
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header is required." });
    }

    // Extract the token part after "Bearer"
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token not provided." });
    }

    // Verify and decode the token using the secret key
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as AuthRequest["user"];

    // Attach decoded user information to the request for later use
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // If verification fails, return an unauthorized error
    return res.status(401).json({ message: "Invalid or expired token.", error });
  }
};
