import * as authService from "../services/auth.services.js";
import asyncHandler from "../utils/asyncHandler.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

export const register = asyncHandler(async (req, res) => {
  const result = await authService.register(req.body);
  res.status(HTTP_STATUS.CREATED).json({
    success: true,
    message: "User registered successfully.",
    data: result,
  });
});

export const login = async (req, res) => {};
export const me = async (req, res) => {};
