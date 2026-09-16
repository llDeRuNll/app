import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Task title is required')
    .max(100, 'Task title must be no more than 100 characters'),
});

export const updateTaskSchema = createTaskSchema;

export type CreateTaskDto = z.infer<typeof createTaskSchema>;

export type UpdateTaskDto = z.infer<typeof updateTaskSchema>;
