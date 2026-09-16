import { z } from "zod";

export const taskSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Task title is required")
    .max(100, "Task title must be no more than 100 characters"),
});
