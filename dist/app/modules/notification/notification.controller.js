"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const notification_service_1 = require("./notification.service");
const getAllNotificationByUserController = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await notification_service_1.NotificationServices.getAllNotificationByUser(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Get all notification successfully',
        data: result
    });
});
exports.NotificationControllers = {
    getAllNotificationByUserController
};
//# sourceMappingURL=notification.controller.js.map