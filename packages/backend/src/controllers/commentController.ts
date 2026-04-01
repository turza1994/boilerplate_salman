import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import * as commentService from '../services/commentService.js';
import { CreateCommentInput } from '../schemas/comment.js';

export const createCommentController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    const postId = Number(req.params.postId);
    const { content, parentId }: CreateCommentInput = req.body;

    const comment = await commentService.createComment(
      postId,
      userId,
      content,
      parentId
    );

    res.status(201).json({
      success: true,
      data: comment,
    });
  }
);

export const getCommentsController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    const postId = Number(req.params.postId);

    const comments = await commentService.getComments(postId, userId);

    res.json({
      success: true,
      data: comments,
    });
  }
);

export const deleteCommentController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    const commentId = Number(req.params.id);

    await commentService.deleteComment(commentId, userId);

    res.json({
      success: true,
      message: 'Comment deleted',
    });
  }
);

export const replyToCommentController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    const parentId = Number(req.params.id);
    const { content }: { content: string } = req.body;

    const comment = await commentService.createComment(
      0,
      userId,
      content,
      parentId
    );

    res.status(201).json({
      success: true,
      data: comment,
    });
  }
);
