import { z } from 'zod';

export const createCommentSchema = z.object({
  content: z.string().min(1),
  parentId: z.number().optional(),
});

export type CreateCommentInput = z.infer<typeof createCommentSchema>;
