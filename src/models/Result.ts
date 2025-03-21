import mongoose, { Schema, Document } from "mongoose";

// Define the interface for TypeScript
export interface ResultType extends Document {
  takenTime: number;
  totalMarks: number;
  totalQuizMarks: number;
  isPublished: boolean;
  selectedAnswers: Record<string, string[]>;
  results: {
    question: mongoose.Types.ObjectId;
    isCorrectAnswer: boolean;
  }[];
  totalQuestion: number;
  correctAnswer: number;
  quiz: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
}

// Define the Schema
const resultSchema = new Schema<ResultType>(
  {
    takenTime: { type: Number, required: true },
    totalMarks: { type: Number, default: 0 },
    totalQuizMarks: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
    totalQuestion: { type: Number, require: true },
    correctAnswer: { type: Number, required: true },
    selectedAnswers: {
      type: Map,
      of: [String], // Each question ID maps to an array of selected option indices
      default: {},
    },
    results: [
      {
        question: { type: Schema.Types.ObjectId, ref: "Question", required: true },
        isCorrectAnswer: {type: Boolean, required: true}
      }
    ],
    quiz: { type: Schema.Types.ObjectId, ref: "Quiz", required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

// Create the Mongoose Model
export const Result = mongoose.model<ResultType>("Result", resultSchema);
