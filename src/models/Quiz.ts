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
    questionIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Quiz = mongoose.model("Quiz", quizSchema);
