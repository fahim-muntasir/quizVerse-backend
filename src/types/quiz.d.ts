import { QuestionType as ZodQuestionType } from "../schemas/quizSchema";

export type QuizDetails = {
  title: string;
  description: string;
  category: string;
  duration: number;
  difficulty: "Easy" | "Medium" | "Hard";
  user: string;
};

export type QuestionTypeWithQuizId = ZodQuestionType & {
  quizId: string;
};

// Define the Question Type
export type QuestionType = {
  _id: string;
  text: string;
  type: "single" | "multiple";
  options: string[];
  correctAnswer: string[];
  marks: number;
  quizId?: string; // Optional in case it's missing
  createdAt: string;
  updatedAt: string;
};

// Define the Quiz Type
export type QuizType = {
  _id: string;
  title: string;
  description: string;
  category: string;
  duration: number;
  difficulty: "Easy" | "Medium" | "Hard";
  totalMarks: number;
  status: "Active" | "Deactive" | "Pending";
  questions: QuestionType[];
  user: string;
  createdAt: string;
  updatedAt: string;
};