import { Response, Request, NextFunction } from "express";
import { findAllParticipantsItems } from "../../../../lib/user/findAllParticipantsItems";
import {
  paginationGenerate,
  generatePaginationLinks,
} from "../../../../utils/pagination";
import { successResponse } from "../../../../utils/responseHelper";

export const getParticipantsQuizController = async (
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
  let userId = req.params?.userId || "";

  try {
    const { data, totalItems } = await findAllParticipantsItems({
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
