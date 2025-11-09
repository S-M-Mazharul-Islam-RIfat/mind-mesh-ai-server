import express from 'express';
import { aiControllers } from './ai.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post('/generate-thread-summary', auth(USER_ROLE.user), aiControllers.generateThreadSummaryController)

export const aiRoutes = router;