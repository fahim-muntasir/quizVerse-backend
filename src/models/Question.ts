import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  type: { type: String, enum: ["multiple", "single"], required: true },
  options: {
    type: [String],
    validate: {
      validator: (options: string[]) => options.length >= 2 && options.length <= 6,
      message: "Options must have between 2 and 6 items.",
    },
    required: true,
  },
  correctAnswer: {
    type: [String],
    validate: {
      validator: (answers: string[]) => answers.length >= 1,
      message: "At least one correct answer is required.",
    },
    required: true,
  },
  marks: { type: Number, min: 1, required: true },
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
}, { timestamps: true, id: true });

// Infer the type from the schema
export type QuestionType = mongoose.InferSchemaType<typeof questionSchema>;

export const Question = mongoose.model("Question", questionSchema);
