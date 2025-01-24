import { Response, Request, NextFunction } from "express";
import { findSingleItem } from "../../../../lib/quiz";
import { successResponse } from "../../../../utils/responseHelper";

export const getSingleQuizController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const quizId = req.params.id;

  try {
    const quiz = await findSingleItem(quizId);

    // create all links for response
    const links = {
      self: `${req.protocol}://${req.get("host")}${req.originalUrl}`,
    };

    // create response data
    const data = {
      id: quiz.id,
      title: quiz.title,
      description: quiz.description,
      category: quiz.category,
      duration: quiz.duration,
      difficulty: quiz.difficulty,
      user: quiz.user,
      createdAt: quiz.createdAt,
      updatedAt: quiz.updatedAt,
      questions: quiz.questions,
    };

    // send final response
    successResponse(res, data, "Quizzes fetched successfully", 201, links);
  } catch (error) {
    next(error);
  }
};
