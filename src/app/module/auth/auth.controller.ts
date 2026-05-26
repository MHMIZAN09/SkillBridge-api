import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";

const register = catchAsync(async (req: Request, res: Response) => {
  console.log("Register payload:", req.body); // Debug log
  const result = await AuthService.register(req.body);
  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Login successful",
    data: result,
  });
});




export const AuthController = {
  register,
  login,

};
