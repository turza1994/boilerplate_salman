import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { upload } from '../middlewares/upload.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = Router();

router.post(
  '/',
  authMiddleware,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  upload.single('image') as any,
  asyncHandler(async (req: Request, res: Response) => {
    const file = req.file;
    if (!file) {
      res.status(400).json({
        success: false,
        message: 'No image file provided',
      });
      return;
    }

    res.json({
      success: true,
      data: {
        url: `/uploads/${file.filename}`,
      },
    });
  })
);

export default router;
