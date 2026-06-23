import { collegeRepository } from "../repositories/college.repository.js";
import { ApiError } from "../utils/apiError.js";

export const collegeService = {
  async getColleges(query: any) {
    const {
      search,
      state,
      minFees,
      maxFees,
      minRating,
      page = 1,
      limit = 10,
      sortBy = "rating",
      order = "desc",
    } = query;

    const where: any = {};

    if (search) {
      where.name = {
        contains: search,
        mode: "insensitive",
      };
    }

    if (state) {
      where.state = state;
    }

    if (minFees || maxFees) {
      where.fees = {
        ...(minFees && { gte: Number(minFees) }),
        ...(maxFees && { lte: Number(maxFees) }),
      };
    }

    if (minRating) {
      where.rating = {
        gte: Number(minRating),
      };
    }

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const skip = (pageNumber - 1) * limitNumber;

    const [colleges, total] = await Promise.all([
      collegeRepository.findMany({
        where,
        skip,
        take: limitNumber,
        orderBy: {
          [sortBy]: order,
        },
      }),

      collegeRepository.count(where),
    ]);

    return {
      colleges,
      pagination: {
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(total / limitNumber),
      },
    };
  },

  async getCollegeById(id: string) {
    const college = await collegeRepository.findById(id);

    if (!college) {
      throw new ApiError(404, "College not found");
    }

    return college;
  },
};