import { Request, Response } from "express";
import { CategoryService } from "./category.service";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const category = await CategoryService.createCategory(req.body);
  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "Category created successfully",
    data: category,
  });
});

export const CategoryController = {
  createCategory,
};
