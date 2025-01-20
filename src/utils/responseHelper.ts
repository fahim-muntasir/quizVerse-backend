import { Response } from "express";

// Define the type for the links
type Links = {
  self?: string;
  next?: string;
  prev?: string;
  [key: string]: string | undefined;
};

export const successResponse = <T>(
  res: Response,
  data: T,
  message = "Success",
  code = 200,
  links?: Links
) => {
  res.status(code).json({
    success: true,
    code,
    message,
    data,
    links,
  });
};

type Details = {
  field: string;
  message: string;
  code: string;
};

export const errorResponse = (
  res: Response,
  error = "An error occurred",
  code = 500,
  details?: Details[] | null
) => {
  res.status(code).json({
    success: false,
    code,
    error,
    details, // Optional additional error details
  });
};
