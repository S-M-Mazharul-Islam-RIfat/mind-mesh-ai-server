import express from 'express';
import { ThreadControllers } from './thread.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ThreadValidationSchema } from './thread.validation';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/create-thread', auth(USER_ROLE.user), validateRequest(ThreadValidationSchema.createThreadValidationSchema), ThreadControllers.createThreadController);
router.get('/', ThreadControllers.getAllThreadController);
router.get('/thread/:id', auth(USER_ROLE.user), ThreadControllers.getSingleThreadController);


export const threadRoutes = router;