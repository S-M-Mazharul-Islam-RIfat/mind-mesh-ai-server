import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.router";
import { userRoutes } from "../modules/user/user.route";
import { threadRoutes } from "../modules/thread/thread.route";
import { commentRoutes } from "../modules/comment/comment.route";
import { notificationRoutes } from "../modules/notification/notification.route";
import { aiRoutes } from "../modules/ai/ai.route";

const router = Router();
const moduleRoutes = [
   {
      path: '/auth',
      route: authRoutes
   },
   {
      path: '/users',
      route: userRoutes
   },
   {
      path: '/threads',
      route: threadRoutes
   },
   {
      path: '/comments',
      route: commentRoutes
   },
   {
      path: '/notifications',
      route: notificationRoutes
   },
   {
      path: '/ai',
      route: aiRoutes
   }
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router;