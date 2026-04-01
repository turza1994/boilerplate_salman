import { Router } from 'express';
import {
  togglePostLikeController,
  getPostLikersController,
  toggleCommentLikeController,
  getCommentLikersController,
} from '../controllers/likeController.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = Router();

router.post('/posts/:id/like', authMiddleware, togglePostLikeController);
router.get('/posts/:id/likes', authMiddleware, getPostLikersController);
router.post('/comments/:id/like', authMiddleware, toggleCommentLikeController);
router.get('/comments/:id/likes', authMiddleware, getCommentLikersController);

export default router;
