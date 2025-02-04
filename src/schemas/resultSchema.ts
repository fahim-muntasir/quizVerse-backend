import { z } from "zod";

export const resultSchema = z.object({
  selectedAnswers: z.record(z.string(), z.array(z.string())),
  quizId: z.string(),
  takenTime: z.number().min(1),
});

export type ResultInputType = z.infer<typeof resultSchema>;