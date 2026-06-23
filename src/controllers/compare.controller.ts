import { Request, Response, NextFunction } from "express";
import { compareService } from "../services/compare.service.js";
import { ApiResponse } from "../utils/apiResponse.js";

export const compareColleges = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { collegeIds } = req.body;

    const result =
      await compareService.compareColleges(
        collegeIds
      );

    res.status(200).json(
      new ApiResponse(
        200,
        "Comparison generated successfully",
        result
      )
    );
  } catch (error) {
    next(error);
  }
};