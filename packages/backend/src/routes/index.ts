import { Router } from 'express';
import authRoutes from './authRoutes.js';
import refreshRoutes from './refreshRoutes.js';
import postRoutes from './postRoutes.js';
import commentRoutes from './commentRoutes.js';
import likeRoutes from './likeRoutes.js';
import uploadRoutes from './uploadRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/auth', refreshRoutes);
router.use('/posts', postRoutes);
router.use('/', commentRoutes);
router.use('/', likeRoutes);
router.use('/upload', uploadRoutes);

router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString(),
  });
});

export default router;
