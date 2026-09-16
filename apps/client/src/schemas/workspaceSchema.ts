import { z } from "zod";

export const workspaceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(5, "Workspace name must be at least 5 characters")
    .max(30, "Workspace name must be no more than 30 characters")
    .regex(/^\p{Ll}+$/u, "Workspace name can only contain lowercase letters"),
});

export type WorkspaceFormData = z.infer<typeof workspaceSchema>;
