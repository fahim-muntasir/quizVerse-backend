import { Quiz } from "../../models";
import createHttpError from "http-errors";

export const deleteQuiz = async (id: string) => {
  try {
    const deletedItem = await Quiz.findByIdAndDelete(id);

    if (!deletedItem) {
      throw createHttpError(404, "Quiz not found!");
    }

    return deletedItem;
  } catch (error) {
    throw error;
  }
};
