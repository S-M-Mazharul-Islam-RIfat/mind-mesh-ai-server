import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.router";
import { userRoutes } from "../modules/user/user.route";
import { threadRoutes } from "../modules/thread/thread.route";
import { commentRoutes } from "../modules/comment/comment.route";

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
   }
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router;