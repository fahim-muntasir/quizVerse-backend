import { Question } from "../../models";
import createHttpError from "http-errors";

export const deleteQuestions = async (ids: string[]) => {
  try {
    if (!ids || ids.length === 0) {
      throw createHttpError(400, "No quiz IDs provided!");
    }

    // Use the `deleteMany` method to delete multiple quizzes
    const result = await Question.deleteMany({ _id: { $in: ids } });

    if (result.deletedCount === 0) {
      throw createHttpError(404, "No quizzes found to delete!");
    }

    return result;
  } catch (error) {
    throw error;
  }
};
