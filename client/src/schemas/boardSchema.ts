import { z } from "zod";

export const boardSchema = z.object({
  name: z.string().min(1, "Column name is required"),
});
