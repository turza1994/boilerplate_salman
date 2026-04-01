import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import * as likeService from '../services/likeService.js';

export const togglePostLikeController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    const postId = Number(req.params.id);

    const result = await likeService.toggleLike(postId, userId);

    res.json({
      success: true,
      data: result,
    });
  }
);

export const getPostLikersController = asyncHandler(
  async (req: Request, res: Response) => {
    const postId = Number(req.params.id);

    const likers = await likeService.getPostLikers(postId);

    res.json({
      success: true,
      data: likers,
    });
  }
);

export const toggleCommentLikeController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    const commentId = Number(req.params.id);

    const result = await likeService.toggleCommentLike(commentId, userId);

    res.json({
      success: true,
      data: result,
    });
  }
);

export const getCommentLikersController = asyncHandler(
  async (req: Request, res: Response) => {
    const commentId = Number(req.params.id);

    const likers = await likeService.getCommentLikers(commentId);

    res.json({
      success: true,
      data: likers,
    });
  }
);
