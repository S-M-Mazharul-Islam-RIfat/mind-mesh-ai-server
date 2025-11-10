import { QueueEvents } from "bullmq";
import redis from "../../config/redis";
import { notificationQueue } from "./notification.queue";
import { getIO } from "../../config/socket";

export const notificationEvents = new QueueEvents("notification-queue", {
   connection: redis,
});

notificationEvents.on("completed", async ({ jobId }) => {
   const job = await notificationQueue.getJob(jobId);
   if (!job) {
      return;
   }

   const { userId, message, type, threadId } = job.data;
   const io = getIO();

   io.to(userId).emit("notification", { userId, message, type, threadId });
});
