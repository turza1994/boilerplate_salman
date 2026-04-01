import multer from 'multer';
import path from 'path';
import { randomBytes } from 'crypto';

const UPLOADS_DIR = path.join(process.cwd(), 'uploads');

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (_req, file, cb) => {
    const uniqueName = `${randomBytes(16).toString('hex')}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
