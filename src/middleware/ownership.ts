import { Response, Request, NextFunction } from "express";
import createHttpError from "http-errors";
import { checkQuizOwnerShip } from "../lib/quiz";

export const ownership = (model: string) => async (req: Request, _res: Response, next: NextFunction) => {

  if (req.user && req.user.role === "admin") {
    return next();
  }

  try {
    // if user admin then this all condition will ingone
    switch (model) {
      case "Quiz":
        const isUserOwner = await checkQuizOwnerShip({
          resourceId: req.params.id,
          userId: req.user?.id,
        });

        if (!isUserOwner) {
          return next(createHttpError(403, "Permission denied!"));
        }

        return next();

      default:
        return next(createHttpError(403, "Permission denied!"));
    }
  } catch (error) {
    next(error);
  }
};