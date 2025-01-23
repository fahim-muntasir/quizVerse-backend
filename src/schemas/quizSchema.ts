import { z } from "zod";

export const quizCreationSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .nonempty({ message: "Title is required" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" })
    .nonempty({ message: "Description is required" }),
  category: z.string().nonempty({ message: "Category is required" }),
  duration: z
    .number()
    .min(1, { message: "Duration must be at least 1 minute" })
    .nonnegative({ message: "Duration is required" }),
  difficulty: z.enum(["Easy", "Medium", "Hard"], {
    invalid_type_error: "Invalid difficulty",
  }),
  questions: z.array(
    z.object({
      text: z.string().nonempty({ message: "Question text is required" }),
      type: z.enum(["multiple", "single"], {
        invalid_type_error: "Invalid question type",
      }),
      options: z
        .array(z.string().nonempty({ message: "Option cannot be empty" }))
        .min(2, { message: "At least 2 options are required" })
        .max(6, { message: "Cannot have more than 6 options" }),
      correctAnswer: z
        .array(z.string())
        .min(1, { message: "At least one correct answer is required" }),
      marks: z.number().min(1, { message: "Marks must be at least 1" }),
    })
  ),
});

// Infer the type from the schema
export type QuizCreationType = z.infer<typeof quizCreationSchema>;

// Create a schema for updates by making all fields optional
export const quizUpdateSchema = quizCreationSchema
  .omit({ questions: true })
  .partial();

// Infer the type for quiz updates
export type QuizUpdateType = z.infer<typeof quizUpdateSchema>;

// Extract the type for a single question
export type QuestionType = z.infer<
  typeof quizCreationSchema
>["questions"][number];
