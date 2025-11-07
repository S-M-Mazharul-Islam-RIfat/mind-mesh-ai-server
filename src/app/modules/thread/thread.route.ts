import express from 'express';
import { ThreadControllers } from './thread.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ThreadValidationSchema } from './thread.validation';

const router = express.Router();

router.post('/create-thread', validateRequest(ThreadValidationSchema.createThreadValidationSchema), ThreadControllers.createThreadController);
router.get('/', ThreadControllers.getAllThreadController);
router.get('/thread/:id', ThreadControllers.getSingleThreadController);


export const threadRoutes = router;