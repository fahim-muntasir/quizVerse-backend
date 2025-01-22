import { Request, Response, NextFunction } from "express";
import { tokenValidator } from "../lib/auth";
import createHttpError from "http-errors";
import { UserType } from "../types/user";

// Define the type guard
function isUserType(decoded: any): decoded is UserType {
  return (
    typeof decoded === "object" &&
    decoded !== null &&
    typeof decoded.id === "string" &&
    typeof decoded.fullName === "string" &&
    typeof decoded.email === "string" &&
    typeof decoded.role === "string" &&
    (typeof decoded.updatedAt === "string" ||
      decoded.updatedAt instanceof Date) &&
    (typeof decoded.createdAt === "string" || decoded.createdAt instanceof Date)
  );
}

export const auth = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.authorization) {
      throw createHttpError(
        401,
        "Authorization header is missing. Please include a valid token."
      );
    }

    const token = req.headers.authorization.split(" ")[1];

    const decoded = await tokenValidator(token);

    // Use the type guard to validate `decoded`
    if (!isUserType(decoded)) {
      throw createHttpError(401, "Invalid token payload.");
    }

    req.user = {
      id: decoded.id,
      fullName: decoded.fullName,
      email: decoded.email,
      role: decoded.role,
      updatedAt: decoded.updatedAt,
      createdAt: decoded.createdAt,
    };

    next();
  } catch (error) {
    next(error);
  }
};
