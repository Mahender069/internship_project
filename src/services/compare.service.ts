import { compareRepository } from "../repositories/compare.repository.js";
import { ApiError } from "../utils/apiError.js";

export const compareService = {
  async compareColleges(
    collegeIds: string[]
  ) {
    if (
      collegeIds.length < 2 ||
      collegeIds.length > 3
    ) {
      throw new ApiError(
        400,
        "Please select 2-3 colleges"
      );
    }

    const colleges =
      await compareRepository.findColleges(
        collegeIds
      );

    if (colleges.length !== collegeIds.length) {
      throw new ApiError(
        404,
        "One or more colleges not found"
      );
    }

    return colleges;
  },
};