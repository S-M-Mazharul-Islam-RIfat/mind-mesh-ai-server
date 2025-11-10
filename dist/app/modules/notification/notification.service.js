"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationServices = void 0;
const notification_model_1 = require("./notification.model");
const getAllNotificationByUser = async (userId) => {
    const res = await notification_model_1.NotificationModel.find({ userId });
    return res;
};
exports.NotificationServices = {
    getAllNotificationByUser
};
//# sourceMappingURL=notification.service.js.map