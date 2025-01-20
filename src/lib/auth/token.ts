import jwt from "jsonwebtoken";
import createHttpError from "http-errors";

const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRESIN } = process.env;

// Generate JWT Token
export const tokenGenerator = async (payload: object): Promise<string> => {
  try {
    if (!ACCESS_TOKEN_SECRET) {
      throw createHttpError(500, "ACCESS_TOKEN_SECRET is not defined.");
    }

    const token = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: ACCESS_TOKEN_EXPIRESIN || "1h",
    });

    return token;
  } catch (error) {
    throw createHttpError(500, `Token generation failed: ${(error as Error).message}`);
  }
};

// Validate JWT Token
export const tokenValidator = async (token: string): Promise<object | string> => {
  try {
    if (!ACCESS_TOKEN_SECRET) {
      throw createHttpError(500, "ACCESS_TOKEN_SECRET is not defined.");
    }

    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);

    return decoded;
  } catch (error) {
    throw createHttpError(500, `Token validation failed: ${(error as Error).message}`);
  }
};
