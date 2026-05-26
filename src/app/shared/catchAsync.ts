/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, RequestHandler, Response } from "express";

const catchAsync = (fn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error: any) {
      console.error("Error in async function:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while processing your request.",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };
};

export default catchAsync;
