import { Response, Request, NextFunction } from "express";
import { searchItems } from "../../../../lib/quiz";
import {
  paginationGenerate,
  generatePaginationLinks,
} from "../../../../utils/pagination";
import { successResponse } from "../../../../utils/responseHelper";

export const searchQuizController = async (
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

  if (searchQuery === "") {
    const { pagination, totalPage } = paginationGenerate({
      page,
      limit,
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

    successResponse(
      res,
      [],
      "Quizzes searched successfully",
      201,
      links,
      pagination
    );
    return;
  }

  try {
    const { data, totalItems } = await searchItems({
      page,
      limit,
      sortType,
      sortBy,
      searchQuery,
      status,
      category,
      difficulty,
      duration,
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
      "Quizzes searched successfully",
      201,
      links,
      pagination
    );
  } catch (error) {
    next(error);
  }
};
