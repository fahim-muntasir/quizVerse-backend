import { Request, Response, NextFunction } from "express";
import { successResponse } from "../../../../utils/responseHelper";
import { deleteQuiz } from "../../../../lib/quiz";

// update quiz controller
export const deleteQuizController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const quizId = req.params.id;

  try {
    const deletedQuiz = await deleteQuiz(quizId);

    // create all links for response
    const links = {
      self: `${req.protocol}://${req.get("host")}${req.originalUrl}`,
    };

    const responseData = {
      id: deletedQuiz.id,
      title: deletedQuiz.title,
      description: deletedQuiz.description,
      category: deletedQuiz.category,
      duration: deletedQuiz.duration,
      difficulty: deletedQuiz.difficulty,
      user: deletedQuiz.user,
      createdAt: deletedQuiz.createdAt,
      updatedAt: deletedQuiz.updatedAt,
      questions: deletedQuiz.questions,
    };

    // send final response
    successResponse(res, responseData, "Quiz has been deleted!", 201, links);
  } catch (error) {
    next(error);
  }
};
