import { Request, Response, NextFunction } from "express";
import { collegeService } from "../services/college.service";
import { ApiResponse } from "../utils/apiResponse";

export const getColleges = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result =
      await collegeService.getColleges(
        req.query
      );

    res.status(200).json(
      new ApiResponse(
        200,
        "Colleges fetched successfully",
        result
      )
    );
  } catch (error) {
    next(error);
  }
};

export const getCollegeById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const college =
      await collegeService.getCollegeById(
        req.params.id
      );

    res.status(200).json(
      new ApiResponse(
        200,
        "College fetched successfully",
        college
      )
    );
  } catch (error) {
    next(error);
  }
};