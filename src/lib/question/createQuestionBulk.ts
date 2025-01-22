import { Question } from "../../models";
import { QuestionTypeWithQuizId } from "../../types/quiz";

export const createQuestionBulk = async (
  questions: QuestionTypeWithQuizId[]
) => {
  try {
    const createdQuestions = await Question.insertMany(questions);

    return createdQuestions;
  } catch (error) {
    throw error;
  }
};
