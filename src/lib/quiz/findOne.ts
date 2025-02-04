import { Quiz } from "../../models";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { QuestionType, QuizType } from "../../types/quiz";

// Function to find a single quiz by ID
export const findSingleItem = async (id: string): Promise<QuizType> => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw createHttpError(400, "Invalid quiz ID format");
    }

    const quiz = await Quiz.findById(id).populate<{
      questions: QuestionType[];
    }>({
      path: "questions",
      select: "-__v",
    });

    if (!quiz) {
      throw createHttpError(404, "Quiz not found!");
    }

    return {
      _id: quiz._id.toString(),
      title: quiz.title,
      description: quiz.description,
      category: quiz.category,
      duration: quiz.duration,
      difficulty: quiz.difficulty,
      totalMarks: quiz.totalMarks,
      status: quiz.status,
      questions: quiz.questions.map((question) => ({
        _id: question._id.toString(),
        text: question.text,
        type: question.type,
        options: question.options,
        correctAnswer: question.correctAnswer,
        marks: question.marks,
        quizId: question.quizId?.toString(),
        createdAt: question.createdAt,
        updatedAt: question.updatedAt,
      })),
      user: quiz.user.toString(),
      createdAt: quiz.createdAt.toISOString(),
      updatedAt: quiz.updatedAt.toISOString(),
    };
  } catch (error) {
    console.error("Error fetching quiz:", error);
    throw error;
  }
};
