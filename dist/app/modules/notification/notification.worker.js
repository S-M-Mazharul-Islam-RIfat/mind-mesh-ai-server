"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationWorker = void 0;
const bullmq_1 = require("bullmq");
const redis_1 = __importDefault(require("../../config/redis"));
exports.notificationWorker = new bullmq_1.Worker("notification-queue", async (job) => {
    console.log("Processing Notification Job:", job.id, job.data);
    const { userId, message, type, threadId } = job.data;
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { userId, message, type, threadId };
}, { connection: redis_1.default });
exports.notificationWorker.on("completed", (job) => {
    console.log(`Worker completed job ${job.id} for user ${job.data.userId}`);
});
exports.notificationWorker.on("failed", (job, err) => {
    console.error(`Worker job ${job?.id} failed:`, err);
});
//# sourceMappingURL=notification.worker.js.map