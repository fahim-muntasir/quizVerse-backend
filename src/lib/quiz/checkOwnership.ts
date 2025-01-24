import { Quiz } from "../../models";
import createHttpError from "http-errors";

export const checkQuizOwnerShip = async ({ resourceId = "", userId = "" }) => {
  try {
    const quiz = await Quiz.findById(resourceId);

    if (!quiz) {
      throw createHttpError(404, "Quiz not found.");
    }

    if (quiz.user.toString() === userId) {

      return true;
    }

    return false;
  } catch (error) {
    throw error;
  }
};