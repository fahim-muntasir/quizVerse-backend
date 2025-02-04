import { Result } from "../../models";
import createHttpError from "http-errors";

// Function to find a single quiz by ID
export const findSingleItem = async ({
  quizId,
  userId,
}: {
  quizId: string;
  userId: string;
}) => {
  try {
    const result = await Result.findOne({
      quiz: quizId,
      user: userId,
    }).populate("results.question");

    if (!result) {
      throw createHttpError(404, "Quiz result not found!");
    }

    return result;
  } catch (error: any) {
    console.error("Error fetching quiz result:", error.message || error);
    throw createHttpError(500, "Internal Server Error");
  }
};
