import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import cookieParser from 'cookie-parser';

const app: Application = express();

// CORS
app.use(
   cors({
      origin: 'http://localhost:5173',
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization'],
   })
);

// Built-in middlewares
app.use(express.json());
app.use(cookieParser());

// Morgan logger (colored dev mode)
app.use(morgan('dev'));

// API routes
app.use('/api/v1', router);

// Global error handler
app.use(globalErrorHandler);

export default app;
