import { Request, Response, NextFunction } from "express";
import { logger } from "../config/logger.js";
import { ApiError } from "../utils/apiError.js";
import { Prisma } from "@prisma/client";

/**
 * Global Error Handler Middleware
 * Must be placed AFTER all routes
 */

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = 500;
  let message = "Internal Server Error";
  let errors: any = null;

  /**
   * 1. Handle custom ApiError
   */
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  /**
   * 2. Handle Prisma known errors
   */
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        statusCode = 409;
        message = "Duplicate entry found (unique constraint failed)";
        break;

      case "P2025":
        statusCode = 404;
        message = "Record not found";
        break;

      default:
        statusCode = 500;
        message = "Database error occurred";
    }

    errors = err.meta;
  }

  /**
   * 3. Handle Prisma validation errors
   */
  else if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    message = "Invalid data sent to database";
  }

  /**
   * 4. Unknown errors (fallback)
   */
  else {
    message = err.message || message;
  }

  /**
   * 🔥 WINSTON LOGGING (CRITICAL PART)
   */
  logger.error({
    message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    statusCode,
    timestamp: new Date().toISOString(),
  });

  /**
   * Final Response
   */
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};