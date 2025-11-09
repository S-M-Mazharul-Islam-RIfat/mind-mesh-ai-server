import { Queue } from "bullmq";
import redis from "../../config/redis";

export const notificationQueue = new Queue("notification-queue", {
   connection: redis,
});
