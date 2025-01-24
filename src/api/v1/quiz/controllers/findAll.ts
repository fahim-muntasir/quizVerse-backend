import { Response, Request, NextFunction } from "express";
import { findAllItems } from "../../../../lib/quiz";
import {
  paginationGenerate,
  generatePaginationLinks,
} from "../../../../utils/pagination";
import { successResponse } from "../../../../utils/responseHelper";

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

  try {
    const { data, totalItems } = await findAllItems({
      page,
      limit,
      sortType,
      sortBy,
      searchQuery,
      status,
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
