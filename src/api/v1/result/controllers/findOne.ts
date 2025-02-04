import { Response, Request, NextFunction } from "express";
import { findSingleItem } from "../../../../lib/result";
import { successResponse } from "../../../../utils/responseHelper";

export const getSingleResultController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const quizId = req.params.id;

  try {
    const result = await findSingleItem({quizId, userId: req.user?.id || ''});

    // create all links for response
    const links = {
      self: `${req.protocol}://${req.get("host")}${req.originalUrl}`,
    };

    // create response data
    const data = { 
      _id: result._id,
      takenTime: result.takenTime,
      totalMarks: result.totalMarks,
      isPublished: result.isPublished,
      totalQuestion: result.totalQuestion,
      correctAnswer: result.correctAnswer,
      selectedAnswers: result.selectedAnswers,
      results: result.results,
      quiz: result.quiz,
      user: result.user,
    };

    // send final response
    successResponse(res, data, "Quizzes fetched successfully", 201, links);
  } catch (error) {
    next(error);
  }
};
