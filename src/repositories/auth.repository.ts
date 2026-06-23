import { prisma } from "../config/db.js";

export const authRepository = {
  async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  async createUser(data: {
    name: string;
    email: string;
    password: string;
  }) {
    return prisma.user.create({
      data,
    });
  },
  async findById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });
}
};