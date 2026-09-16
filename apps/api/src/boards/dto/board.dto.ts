import { z } from 'zod';

export const createBoardSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Board name is required')
    .max(50, 'Board name must be no more than 50 characters'),
});

export const updateBoardSchema = createBoardSchema;

export type CreateBoardDto = z.infer<typeof createBoardSchema>;

export type UpdateBoardDto = z.infer<typeof updateBoardSchema>;

export const reorderBoardsSchema = z.object({
  boardIds: z
    .array(z.uuid())
    .min(1, 'At least one board is required')
    .refine((boardIds) => new Set(boardIds).size === boardIds.length, {
      message: 'Board ids must be unique',
    }),
});

export type ReorderBoardsDto = z.infer<typeof reorderBoardsSchema>;
