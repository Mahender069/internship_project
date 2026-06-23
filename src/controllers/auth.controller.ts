import { Request, Response, NextFunction } from "express";
import { authService } from "../services/auth.service.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { AuthRequest } from "../middlewares/auth.middleware.js";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await authService.register(req.body);

    res.status(201).json(
      new ApiResponse(
        201,
        "User registered successfully",
        result
      )
    );
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await authService.login(req.body);

    res.status(200).json(
      new ApiResponse(
        200,
        "Login successful",
        result
      )
    );
  } catch (error) {
    next(error);
  }
};


export const getProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await authService.getProfile(
      req.user!.userId
    );

    res.status(200).json(
      new ApiResponse(
        200,
        "User profile fetched",
        user
      )
    );
  } catch (error) {
    next(error);
  }
};