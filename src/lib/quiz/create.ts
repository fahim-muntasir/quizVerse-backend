import { Quiz } from "../../models";
import { QuizDetails } from "../../types/quiz";

export const createQuiz = async ({
  title,
  description,
  category,
  duration,
  difficulty,
  user,
}: QuizDetails) => {
  try {
    const createdQuiz = await Quiz.create({
      title,
      description,
      category,
      duration,
      difficulty,
      user,
    });

    return createdQuiz;
  } catch (error) {
    throw error;
  }
};
