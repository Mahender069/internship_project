import { prisma } from "../config/db";

export const savedRepository = {
  findSaved(userId: string, collegeId: string) {
    return prisma.savedCollege.findUnique({
      where: {
        userId_collegeId: {
          userId,
          collegeId,
        },
      },
    });
  },

  saveCollege(userId: string, collegeId: string) {
    return prisma.savedCollege.create({
      data: {
        userId,
        collegeId,
      },
    });
  },

  getSavedColleges(userId: string) {
    return prisma.savedCollege.findMany({
      where: { userId },
      include: {
        college: true,
      },
    });
  },
  removeSavedCollege(userId: string, collegeId: string) {
    return prisma.savedCollege.delete({
      where: {
        userId_collegeId: {
          userId,
          collegeId,
        },
      },
    });
  },
};
