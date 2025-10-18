// src/middlewares/authorize-role.middleware.ts

// Import necessary types from Express and the AuthRequest interface
import { NextFunction, Response } from "express";
import { AuthRequest } from "./validateToken.middleware";

/**
 * Middleware factory: authorizeRole
 * -----------------------------------
 * This middleware enforces **role-based access control (RBAC)**.
 * It checks whether the authenticated user's role matches one of the allowed roles.
 *
 * Usage:
 * - Use it **after** the JWT validation middleware (`validateToken`).
 * - Pass one or more allowed roles as arguments, e.g.:
 *     app.get("/admin", validateToken, authorizeRole("admin"), handler);
 *
 * Workflow:
 * 1. Retrieves the authenticated user from `req.user` (set by validateToken).
 * 2. Verifies that the user exists (is authenticated).
 * 3. Checks if the user's role is among the allowed ones.
 * 4. Calls `next()` if authorized, otherwise returns a 403 error.
 */
export const authorizeRole = (...allowedRoles: ("admin" | "analista")[]) => {
  // Return the actual middleware function
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user;

    // Step 1: Check authentication
    if (!user) {
      return res.status(401).json({ message: "User not authenticated." });
    }

    // Step 2: Check role authorization
    if (!allowedRoles.includes(user.rol)) {
      return res.status(403).json({
        message: `Access denied. Role '${user.rol}' not allowed for this operation.`,
      });
    }

    // Step 3: Proceed to the next middleware or controller
    next();
  };
};