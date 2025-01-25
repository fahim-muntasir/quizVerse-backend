import { Request, Response, NextFunction } from "express";
import { successResponse } from "../../../../utils/responseHelper";
import { deleteQuiz } from "../../../../lib/quiz";
import { deleteQuestions } from "../../../../lib/question";

// update quiz controller
export const deleteQuizController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const quizId = req.params.id;

  try {
    // delete all quezzes related to the quiz
    const deletedQuiz = await deleteQuiz(quizId);

    // delete all questions related to the quiz
    await deleteQuestions(
      deletedQuiz.questions.map((question) => question.toString())
    );

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
