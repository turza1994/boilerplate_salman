import { z } from 'zod';

export const createPostSchema = z.object({
  content: z.string().min(1),
  visibility: z.enum(['public', 'private']).default('public'),
});

export const updatePostSchema = z.object({
  content: z.string().min(1).optional(),
  visibility: z.enum(['public', 'private']).optional(),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;
