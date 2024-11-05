import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      userId: string;
      email: string;
    };
  }
}

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

    if (!token) {
      res.status(401).json({ error: "Access token is missing" });
      return;
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        res.status(403).json({ error: "Invalid token" });
        return;
      }

      req.user = user as { userId: string; email: string };
      next();
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });

    return;
  }
};
