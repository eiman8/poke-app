import bcrypt from "bcrypt";
import prisma from "../config/prisma.js";
import { generateToken } from "../utils/jwt.js";
import AppError from "../utils/AppError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

export const register = async (userData) => {
  //    Throw an error if fields are not filled.
  const { username, email, password } = userData;
  if (!username || !email || !password) {
    throw new AppError(
      "Please fill all required fields.",
      HTTP_STATUS.BAD_REQUEST,
    );
  }
  //    Check in prisma if email already exists.
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  //    Throw an error email already exists.
  if (existingUser) {
    throw new AppError(
      "Email already exists. Try a new email.",
      HTTP_STATUS.CONFLICT,
    );
  }
  //    Generate hashed password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);
  //    Create user in Prisma
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });
  //    Generate JSON Web Token
  const token = generateToken(user.id);
  return {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    token,
  };
};

export const login = async (userData) => {};
