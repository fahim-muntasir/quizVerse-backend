import { Request, Response, NextFunction } from "express";
import {
  quizCreationSchema,
  QuizCreationType,
} from "../../../../schemas/quizSchema";
import { createQuiz } from "../../../../lib/quiz";
import { successResponse } from "../../../../utils/responseHelper";
import { createQuestionBulk } from "../../../../lib/question";

export const createQuizController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data: QuizCreationType = quizCreationSchema.parse(req.body);

    // quiz creation
    const quiz = await createQuiz({
      title: data.title,
      description: data.description,
      category: data.category,
      duration: data.duration,
      difficulty: data.difficulty,
      userId: req.user?.id || "",
    });

    // generate question data for bulk creation
    const questionData = data.questions.map((question) => ({
      ...question,
      quizId: quiz.id,
    }));

    // question creation
    const createdQuestions = await createQuestionBulk(questionData);

    // create all links for response
    const links = {
      self: `${req.protocol}://${req.get("host")}${req.originalUrl}`,
      quiz: `${req.protocol}://${req.get("host")}/v1/quiz/${quiz.id}`,
    };

    const responseData = {
      id: quiz.id,
      title: quiz.title,
      description: quiz.description,
      category: quiz.category,
      duration: quiz.duration,
      difficulty: quiz.difficulty,
      userId: quiz.userId,
      createdAt: quiz.createdAt,
      updatedAt: quiz.updatedAt,
      questions: createdQuestions,
    };

    // send final response
    successResponse(
      res,
      responseData,
      "Quiz created successfully!",
      201,
      links
    );
  } catch (error) {
    next(error);
  }
};
