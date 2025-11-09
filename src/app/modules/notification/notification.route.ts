import express from 'express';
import { NotificationControllers } from './notification.controller';
const router = express.Router();

router.get('/:id', NotificationControllers.getAllNotificationByUserController);
export const notificationRoutes = router; 