import { Response, Request, NextFunction } from "express";
import { findAllItems } from "../../../../lib/quiz";
import {
  paginationGenerate,
  generatePaginationLinks,
} from "../../../../utils/pagination";
import { successResponse } from "../../../../utils/responseHelper";
import { tokenValidator } from "../../../../lib/auth";
import { isUserType } from "../../../../utils/typeGuards";

export const getQuizController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const page = +(req.query.page ?? 1);
  const limit = +(req.query.limit ?? 10);
  const sortType = (req.query.sortType as string) || "desc";
  const sortBy = (req.query.sortBy as string) || "createdAt";
  const searchQuery = (req.query.search as string) || "";
  const status = (req.query.status as string) || "";
  const category = (req.query.category as string) || "";
  const difficulty = (req.query.difficulty as string) || "";
  const duration = +(req.query.duration as string) || 1;
  let userId = "";

  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];

      const decoded = await tokenValidator(token);

      // Use the type guard to validate `decoded`
      if (!isUserType(decoded)) {
        userId = "";
      }

      if (isUserType(decoded)) {
        userId = decoded.id;
      }
    }

    const { data, totalItems } = await findAllItems({
      page,
      limit,
      sortType,
      sortBy,
      searchQuery,
      status,
      category,
      difficulty,
      duration,
      userId,
    });

    const { pagination, totalPage } = paginationGenerate({
      page,
      limit,
      totalItems,
    });

    const links = generatePaginationLinks({
      path: req.baseUrl + req.path,
      page,
      totalPage,
      limit,
      sortType,
      sortBy,
      searchQuery,
      status,
    });

    // send final response
    successResponse(
      res,
      data,
      "Quizzes fetched successfully",
      201,
      links,
      pagination
    );
  } catch (error) {
    next(error);
  }
};
