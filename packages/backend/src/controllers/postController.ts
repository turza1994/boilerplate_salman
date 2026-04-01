import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import * as postService from '../services/postService.js';
import { CreatePostInput, UpdatePostInput } from '../schemas/post.js';

export const createPostController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    const { content, visibility }: CreatePostInput = req.body;
    const file = req as Request & { file?: { filename: string } };
    const imageUrl = file.file?.filename
      ? `/uploads/${file.file.filename}`
      : null;

    const post = await postService.createPost(userId, content, imageUrl, visibility);

    res.status(201).json({
      success: true,
      data: post,
    });
  }
);

export const getFeedController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    const cursor = req.query.cursor ? Number(req.query.cursor) : null;
    const limit = Math.min(Number(req.query.limit) || 10, 50);

    const result = await postService.getFeed(userId, cursor, limit);

    res.json({
      success: true,
      data: result,
    });
  }
);

export const getPostController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    const postId = Number(req.params.id);

    const post = await postService.getPost(postId, userId);

    res.json({
      success: true,
      data: post,
    });
  }
);

export const updatePostController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    const postId = Number(req.params.id);
    const body: UpdatePostInput = req.body;

    const data: { content?: string; visibility?: 'public' | 'private' } = {};
    if (body.content !== undefined) data.content = body.content;
    if (body.visibility !== undefined) data.visibility = body.visibility;

    const post = await postService.updatePost(postId, userId, data);

    res.json({
      success: true,
      data: post,
    });
  }
);

export const deletePostController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    const postId = Number(req.params.id);

    await postService.deletePost(postId, userId);

    res.json({
      success: true,
      message: 'Post deleted',
    });
  }
);
