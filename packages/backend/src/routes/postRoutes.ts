import { Router } from 'express';
import {
  createPostController,
  getFeedController,
  getPostController,
  updatePostController,
  deletePostController,
} from '../controllers/postController.js';
import { validate } from '../middlewares/validate.js';
import { authMiddleware } from '../middlewares/auth.js';
import { createPostSchema, updatePostSchema } from '../schemas/post.js';

const router = Router();

router.get('/', authMiddleware, getFeedController);
router.post('/', authMiddleware, validate(createPostSchema), createPostController);
router.get('/:id', authMiddleware, getPostController);
router.put('/:id', authMiddleware, validate(updatePostSchema), updatePostController);
router.delete('/:id', authMiddleware, deletePostController);

export default router;
