import { Result } from "../../models";
import { ResultType } from "../../models";

export const createResult = async ({
  user,
  quiz,
  totalMarks,
  totalQuizMarks,
  totalQuestion,
  correctAnswer,
  selectedAnswers,
  results,
  takenTime,
}: ResultType) => {
  try {
    const createdResult = await Result.create({
      user,
      quiz,
      totalMarks,
      totalQuestion,
      totalQuizMarks,
      correctAnswer,
      selectedAnswers,
      results,
      takenTime,
    });

    return createdResult;
  } catch (error) {
    throw error;
  }
};
