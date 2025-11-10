"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationEvents = void 0;
const bullmq_1 = require("bullmq");
const redis_1 = __importDefault(require("../../config/redis"));
const notification_queue_1 = require("./notification.queue");
const socket_1 = require("../../config/socket");
exports.notificationEvents = new bullmq_1.QueueEvents("notification-queue", {
    connection: redis_1.default,
});
exports.notificationEvents.on("completed", async ({ jobId }) => {
    const job = await notification_queue_1.notificationQueue.getJob(jobId);
    if (!job) {
        return;
    }
    const { userId, message, type, threadId } = job.data;
    const io = (0, socket_1.getIO)();
    io.to(userId).emit("notification", { userId, message, type, threadId });
});
//# sourceMappingURL=notification.event.js.map