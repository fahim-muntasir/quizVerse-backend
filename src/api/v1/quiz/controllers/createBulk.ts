import { Request, Response, NextFunction } from "express";
import {
  quizCreationSchema,
  QuizCreationType,
} from "../../../../schemas/quizSchema";
import { createQuiz, updateQuiz } from "../../../../lib/quiz";
import { successResponse } from "../../../../utils/responseHelper";
import { createQuestionBulk } from "../../../../lib/question";

export const createBulkQuizController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const quizzesData: QuizCreationType[] = quizCreationSchema
      .array()
      .parse(req.body);

    const createdQuizzes = await Promise.all(
      quizzesData.map(async (data) => {
        // quiz creation
        const quiz = await createQuiz({
          title: data.title,
          description: data.description,
          category: data.category,
          duration: data.duration,
          difficulty: data.difficulty,
          user: req.user?.id || "",
        });

        // generate question data for bulk creation
        const questionData = data.questions.map((question) => ({
          ...question,
          quizId: quiz.id,
        }));

        // question creation
        const createdQuestions = await createQuestionBulk(questionData);

        // total marks calculation
        const totalMarks = createdQuestions.reduce(
          (acc, curr) => acc + curr.marks,
          0
        );

        // update quiz with questions id
        const updatedQuiz = await updateQuiz(quiz.id, {
          totalMarks,
          questions: createdQuestions.map((q) => q.id),
        });

        return {
          id: updatedQuiz.id,
          title: updatedQuiz.title,
          description: updatedQuiz.description,
          category: updatedQuiz.category,
          duration: updatedQuiz.duration,
          difficulty: updatedQuiz.difficulty,
          totalMarks: updatedQuiz.totalMarks,
          status: updatedQuiz.status,
          user: updatedQuiz.user,
          createdAt: updatedQuiz.createdAt,
          updatedAt: updatedQuiz.updatedAt,
          questions: updatedQuiz.questions,
        };
      })
    );

    const links = {
      self: `${req.protocol}://${req.get("host")}${req.originalUrl}`,
    };

    // send final response
    successResponse(
      res,
      createdQuizzes,
      "Quizzes created successfully!",
      201,
      links
    );
  } catch (error) {
    next(error);
  }
};
