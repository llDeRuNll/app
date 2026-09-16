import { z } from "zod";

export const memberSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .pipe(z.email("Invalid email address")),
});

export type MemberFormData = z.infer<typeof memberSchema>;
