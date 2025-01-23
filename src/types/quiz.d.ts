import { QuestionType } from "../schemas/quizSchema";

export type QuizDetails = {
  title: string;
  description: string;
  category: string;
  duration: number;
  difficulty: "Easy" | "Medium" | "Hard";
  user: string;
};

export type QuestionTypeWithQuizId = QuestionType & {
  quizId: string;
};