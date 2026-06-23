import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.js";
import { ApiError } from "../utils/apiError.js";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
}

export const authMiddleware = (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new ApiError(401, "Unauthorized - No token provided"));
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return next(new ApiError(401, "Unauthorized - Invalid token format"));
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return next(new ApiError(401, "Unauthorized - Token verification failed"));
    }

    req.user = decoded;

    next();
  } catch (error) {
    return next(new ApiError(401, "Unauthorized - Invalid or expired token"));
  }
};