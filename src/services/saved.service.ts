import { savedRepository } from "../repositories/saved.repository.js";
import { ApiError } from "../utils/apiError.js";

export const savedService = {
  async saveCollege(userId: string, collegeId: string) {
    const existing = await savedRepository.findSaved(userId, collegeId);

    if (existing) {
      throw new ApiError(409, "College already saved");
    }

    return savedRepository.saveCollege(userId, collegeId);
  },

  async getSavedColleges(userId: string) {
    return savedRepository.getSavedColleges(userId);
  },
  async removeSavedCollege(userId: string, collegeId: string) {
    const existing = await savedRepository.findSaved(userId, collegeId);

    if (!existing) {
      throw new ApiError(404, "Saved college not found");
    }

    await savedRepository.removeSavedCollege(userId, collegeId);

    return null;
  },
};
