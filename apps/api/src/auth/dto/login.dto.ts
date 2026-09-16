import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .email('Invalid email address')
    .transform((email) => email.trim().toLowerCase()),

  password: z
    .string()
    .min(1, 'Password is required')
    .refine(
      (password) => Buffer.byteLength(password, 'utf8') <= 72,
      'Password must not exceed 72 bytes',
    ),
});

export type LoginDto = z.infer<typeof loginSchema>;
