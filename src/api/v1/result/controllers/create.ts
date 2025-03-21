import { Request, Response, NextFunction } from "express";
import {
  resultSchema,
  ResultInputType,
} from "../../../../schemas/resultSchema";
import { successResponse } from "../../../../utils/responseHelper";
import { findSingleItem } from "../../../../lib/quiz";
import { createResult } from "../../../../lib/result";
import { ResultType } from "../../../../models";

export const createResultController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data: ResultInputType = resultSchema.parse(req.body);
    const selectedAnswers = data.selectedAnswers;

    const quiz = await findSingleItem(data.quizId);

    let totalMarks = 0;
    let totalQuizMarks = 0;
    let correctAnswerCount = 0;

    const results = quiz.questions.map((question) => {
      const userAnswers = selectedAnswers[question._id] || [];
      const isCorrect =
        userAnswers.length === question.correctAnswer.length &&
        userAnswers.every((answer) => question.correctAnswer.includes(answer));

      if (isCorrect) {
        totalMarks += question.marks;
        correctAnswerCount++;
      }

      totalQuizMarks += question.marks;
      return {
        question: question._id,
        isCorrectAnswer: isCorrect,
      };
    });

    const payload = {
      user: req.user?.id,
      quiz: quiz._id,
      totalMarks,
      totalQuizMarks,
      totalQuestion: quiz.questions.length,
      correctAnswer: correctAnswerCount,
      selectedAnswers: data.selectedAnswers,
      results,
      takenTime: data.takenTime,
    };

    // create result 
    const createdResult = await createResult(payload as unknown as ResultType);

    // create all links for response
    const responseData = {
      id: createdResult._id,
      user: createdResult.user,
      quiz: createdResult.quiz,
      totalMarks: createdResult.totalMarks,
      totalQuizMarks: createdResult.totalQuizMarks,
      totalQuestion: createdResult.totalQuestion,
      correctAnswer: createdResult.correctAnswer,
      selectedAnswers: createdResult.selectedAnswers,
      results: createdResult.results,
      takenTime: createdResult.takenTime,
    };

    // Create all links for response
    const links = {
      self: `${req.protocol}://${req.get("host")}${req.originalUrl}`,
      result: `${req.protocol}://${req.get("host")}/api/quiz/${quiz._id}/result`,
    };

    // send final response
    successResponse(
      res,
      responseData,
      "Result created successfully!",
      201,
      links
    );
  } catch (error) {
    next(error);
  }
};
