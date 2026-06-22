import { prisma } from "../config/db";

export const compareRepository = {
  findColleges(collegeIds: string[]) {
    return prisma.college.findMany({
      where: {
        id: {
          in: collegeIds,
        },
      },
      select: {
        id: true,
        name: true,
        fees: true,
        rating: true,
        placementRate: true,
        averagePackage: true,
        location: true,
        state: true,
      },
    });
  },
};