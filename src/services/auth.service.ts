import bcrypt from "bcrypt";
import { authRepository } from "../repositories/auth.repository.js";
import { ApiError } from "../utils/apiError.js";
import { signToken } from "../utils/jwt.js";

export const authService = {
  async register(data: { name: string; email: string; password: string }) {
    const existingUser = await authRepository.findUserByEmail(data.email);

    if (existingUser) {
      throw new ApiError(409, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await authRepository.createUser({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });

    const token = signToken({
      userId: user.id,
      email: user.email,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  },

  async login(data: { email: string; password: string }) {
    const user = await authRepository.findUserByEmail(data.email);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch) {
      throw new ApiError(401, "Invalid credentials");
    }

    const token = signToken({
      userId: user.id,
      email: user.email,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  },
  async getProfile(userId: string) {
    const user = await authRepository.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }
    return user;
  },
};
