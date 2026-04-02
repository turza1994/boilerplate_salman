import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import path from 'path';
import { errorHandler } from './middlewares/errorHandler.js';
import { rateLimitMiddleware } from './middlewares/rateLimit.js';
import { env } from './config/index.js';
import routes from './routes/index.js';

const app = express();

const corsOrigins =
  env.NODE_ENV === 'production'
    ? env.CORS_ORIGINS.length > 0
      ? env.CORS_ORIGINS
      : ['https://yourdomain.com', 'https://www.yourdomain.com']
    : env.CORS_ORIGINS.length > 0
      ? env.CORS_ORIGINS
      : [
          'http://localhost:3000',
          'http://localhost:5173',
          'http://localhost:8080',
          'http://localhost:3001',
        ];

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin || corsOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(rateLimitMiddleware);

// Serve uploaded files with CORS headers
app.use(
  '/uploads',
  (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
  },
  express.static(path.join(process.cwd(), 'uploads'))
);

app.use('/api', routes);

app.use(errorHandler);

export { app };
