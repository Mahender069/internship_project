import { prisma } from "../config/db.js";

export const collegeRepository = {
  findMany(args: any) {
    return prisma.college.findMany(args);
  },

  count(where: any) {
    return prisma.college.count({ where });
  },

  findById(id: string) {
    return prisma.college.findUnique({
      where: { id },
      include: {
        courses: true,
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
  },
};