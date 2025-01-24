import { Quiz } from "../../models";
import createHttpError from "http-errors";

export const findSingleItem = async (id:string) => {
  try {
    const quiz = await Quiz.findById(id);

    if (!quiz) {
      throw createHttpError(404, "Article not found!");
    }
    
    return quiz;
  } catch (error) {
    throw error;
  }
};