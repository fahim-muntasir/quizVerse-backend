import { Request, Response, NextFunction } from "express";
import {
  quizUpdateSchema,
  QuizUpdateType,
} from "../../../../schemas/quizSchema";
import { successResponse } from "../../../../utils/responseHelper";
import { updateQuiz } from "../../../../lib/quiz";
import mongoose from "mongoose";

// update quiz controller
export const updateQuizController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const quizId = req.params.id;
  
  try {
    const data: QuizUpdateType = quizUpdateSchema.parse(req.body);

    // update quiz with questions id
    const updatedQuiz = await updateQuiz(quizId, {
      title: data.title,
      description: data.description,
      category: data.category,
      duration: data.duration,
      difficulty: data.difficulty,
      user: new mongoose.Types.ObjectId(req.user?.id),
    });

    // create all links for response
    const links = {
      self: `${req.protocol}://${req.get("host")}${req.originalUrl}`,
    };

    const responseData = {
      id: updatedQuiz.id,
      title: updatedQuiz.title,
      description: updatedQuiz.description,
      category: updatedQuiz.category,
      duration: updatedQuiz.duration,
      difficulty: updatedQuiz.difficulty,
      user: updatedQuiz.user,
      createdAt: updatedQuiz.createdAt,
      updatedAt: updatedQuiz.updatedAt,
      questions: updatedQuiz.questions,
    };

    // send final response
    successResponse(res, responseData, "Quiz updated successfully", 201, links);
  } catch (error) {
    next(error);
  }
};
