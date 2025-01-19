import { Request, Response, NextFunction } from "express";
import createHttpError, { HttpError } from "http-errors";

export const notFountError = (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  const error = createHttpError(404, "Resource not found!");

  next(error);
};

export const globalError = (
  error: HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // others error
  if (error.status) {
    res.status(error.status).json({
      code: error.statusCode,
      error: error.message,
    });
  }

  // 500 error response
  res.status(500).json({
    code: 500,
    error: "Something went wrong!",
  });
};
