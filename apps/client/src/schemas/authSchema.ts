import { z } from "zod";

const emailSchema = z
  .email("Invalid email address")
  .transform((email) => email.trim().toLowerCase());

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z.object({
  email: emailSchema,
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .refine(
      (password) => new TextEncoder().encode(password).length <= 72,
      "Password must be no more than 72 bytes",
    ),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export type RegisterFormData = z.infer<typeof registerSchema>;
