import { Queue } from "bullmq";
import redis from "../../config/redis";

// queue
export const notificationQueue = new Queue("notification-queue", {
   connection: redis,
});
