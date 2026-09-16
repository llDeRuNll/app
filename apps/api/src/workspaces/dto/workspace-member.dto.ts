import { z } from 'zod';

export const addWorkspaceMemberSchema = z.object({
  email: z
    .email('Invalid email address')
    .transform((email) => email.trim().toLowerCase()),
});

export type AddWorkspaceMemberDto = z.infer<typeof addWorkspaceMemberSchema>;
