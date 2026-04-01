import { Router } from 'express';
import {
  createCommentController,
  getCommentsController,
  deleteCommentController,
  replyToCommentController,
} from '../controllers/commentController.js';
import { validate } from '../middlewares/validate.js';
import { authMiddleware } from '../middlewares/auth.js';
import { createCommentSchema } from '../schemas/comment.js';

const router = Router();

router.get('/posts/:postId/comments', authMiddleware, getCommentsController);
router.post(
  '/posts/:postId/comments',
  authMiddleware,
  validate(createCommentSchema),
  createCommentController
);
router.delete('/comments/:id', authMiddleware, deleteCommentController);
router.post(
  '/comments/:id/reply',
  authMiddleware,
  validate(createCommentSchema),
  replyToCommentController
);

export default router;
