import express from 'express';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.get('/:id', auth(USER_ROLE.user), UserControllers.getUserInfoByUserIdController)

export const userRoutes = router;