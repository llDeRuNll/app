import { z } from "zod";

export const workspaceSchema = z.object({
  name: z.string().superRefine((value, ctx) => {
    if (/[^a-z]/.test(value)) {
      ctx.addIssue({
        code: "custom",
        message: "Workspace name can only contain lowercase letters",
      });

      return;
    }

    if (value.length < 5) {
      ctx.addIssue({
        code: "custom",
        message: "Workspace name must be at least 5 characters",
      });

      return;
    }

    if (value.length > 30) {
      ctx.addIssue({
        code: "custom",
        message: "Workspace name must be no more than 30 characters",
      });
    }
  }),
});

export type WorkspaceFormData = z.infer<typeof workspaceSchema>;
