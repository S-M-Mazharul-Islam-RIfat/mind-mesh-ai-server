import express from 'express';
import { aiControllers } from './ai.controller';

const router = express.Router();

router.post('/generate-thread-summary', aiControllers.generateThreadSummaryController)

export const aiRoutes = router;