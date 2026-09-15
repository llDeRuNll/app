import { z } from 'zod';

export const registerSchema = z.object({
  email: z
    .email('Invalid email address')
    .transform((email) => email.trim().toLowerCase()),
  password: z
    .string()
    .min(8, 'Password must contain at least 8 characters')
    .refine(
      (password) => Buffer.byteLength(password, 'utf8') <= 72,
      'Password must not exceed 72 bytes',
    ),
});

export type RegisterDto = z.infer<typeof registerSchema>;
