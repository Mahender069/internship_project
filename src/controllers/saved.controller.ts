import { Response, NextFunction } from "express";
import { savedService } from "../services/saved.service";
import { ApiResponse } from "../utils/apiResponse";
import { AuthRequest } from "../middlewares/auth.middleware";
import { ApiError } from "../utils/apiError";

export const saveCollege = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { collegeId } = req.body;

    const result =
      await savedService.saveCollege(
        req.user!.userId,
        collegeId
      );

    res.status(201).json(
      new ApiResponse(
        201,
        "College saved successfully",
        result
      )
    );
  } catch (error) {
    next(error);
  }
};

export const getSavedColleges = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const colleges =
      await savedService.getSavedColleges(
        req.user!.userId
      );

    res.status(200).json(
      new ApiResponse(
        200,
        "Saved colleges fetched successfully",
        colleges
      )
    );
  } catch (error) {
    next(error);
  }
};

export const removeSavedCollege = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new ApiError(
        401,
        "Unauthorized"
      );
    }

    const { collegeId } = req.params;

    await savedService.removeSavedCollege(
      req.user.userId,
      collegeId
    );

    res.status(200).json(
      new ApiResponse(
        200,
        "College removed successfully",
        null
      )
    );
  } catch (error) {
    next(error);
  }
};