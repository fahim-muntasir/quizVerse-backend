import { Quiz } from "../../models";
import { QuizType } from "../../models";
import createHttpError from "http-errors";

// create a function for updating a quiz
export const updateQuiz = async (id: string, data: Partial<QuizType>) => {
  try {
    const quiz = await Quiz.findById(id); // find quiz by id

    if (!quiz) {
      throw createHttpError(404, "Quiz not found.");
    }

    // Update each property if it exists in the data object
    if (data.title !== undefined) quiz.title = data.title;
    if (data.description !== undefined) quiz.description = data.description;
    if (data.category !== undefined) quiz.category = data.category;
    if (data.duration !== undefined) quiz.duration = data.duration;
    if (data.difficulty !== undefined) quiz.difficulty = data.difficulty;
    if (data.questions !== undefined) quiz.questions = data.questions;
    if (data.totalMarks !== undefined) quiz.totalMarks = data.totalMarks;
    if (data.status !== undefined) quiz.status = data.status;
    if (data.user !== undefined) quiz.user = data.user;

    // Save the updated quiz
    const updatedQuiz = await quiz.save();

    return updatedQuiz;
  } catch (error) {
    throw error;
  }
};
