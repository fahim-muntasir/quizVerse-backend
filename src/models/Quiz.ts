import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    title: { type: String, minlength: 3, required: true },
    description: { type: String, minlength: 10, required: true },
    category: { type: String, required: true },
    duration: { type: Number, min: 1, required: true },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
// Infer the type from the schema
export type QuizType = mongoose.InferSchemaType<typeof quizSchema>;

export const Quiz = mongoose.model("Quiz", quizSchema);
