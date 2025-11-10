"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_router_1 = require("../modules/auth/auth.router");
const user_route_1 = require("../modules/user/user.route");
const thread_route_1 = require("../modules/thread/thread.route");
const comment_route_1 = require("../modules/comment/comment.route");
const notification_route_1 = require("../modules/notification/notification.route");
const ai_route_1 = require("../modules/ai/ai.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_router_1.authRoutes
    },
    {
        path: '/users',
        route: user_route_1.userRoutes
    },
    {
        path: '/threads',
        route: thread_route_1.threadRoutes
    },
    {
        path: '/comments',
        route: comment_route_1.commentRoutes
    },
    {
        path: '/notifications',
        route: notification_route_1.notificationRoutes
    },
    {
        path: '/ai',
        route: ai_route_1.aiRoutes
    }
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
//# sourceMappingURL=index.js.map