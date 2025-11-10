"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationRoutes = void 0;
const express_1 = __importDefault(require("express"));
const notification_controller_1 = require("./notification.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const router = express_1.default.Router();
router.get('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.user), notification_controller_1.NotificationControllers.getAllNotificationByUserController);
exports.notificationRoutes = router;
//# sourceMappingURL=notification.route.js.map