import express from 'express';
import { NotificationControllers } from './notification.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
const router = express.Router();

router.get('/', auth(USER_ROLE.user), NotificationControllers.getAllNotificationByUserController);
export const notificationRoutes = router; 