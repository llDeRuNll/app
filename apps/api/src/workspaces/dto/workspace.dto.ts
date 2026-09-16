import { z } from 'zod';

export const createWorkspaceSchema = z.object({
  name: z
    .string()
    .regex(/^\p{Ll}+$/u, 'Workspace name can only contain lowercase letters')
    .min(5, 'Workspace name must be at least 5 characters')
    .max(30, 'Workspace name must be no more than 30 characters'),
});

export const updateWorkspaceSchema = createWorkspaceSchema;

export type CreateWorkspaceDto = z.infer<typeof createWorkspaceSchema>;

export type UpdateWorkspaceDto = z.infer<typeof updateWorkspaceSchema>;
