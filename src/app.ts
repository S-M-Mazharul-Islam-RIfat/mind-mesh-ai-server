import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import cookieParser from 'cookie-parser';
import config from './app/config';

const app: Application = express();

// CORS
app.use(
   cors({
      origin: `http://localhost:${config.client_port}`,
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization'],
   })
);

// built-in middlewares
app.use(express.json());
app.use(cookieParser());

// Morgan logger
app.use(morgan('dev'));

// API routes
app.use('/api/v1', router);

// global error handler
app.use(globalErrorHandler);

export default app;
