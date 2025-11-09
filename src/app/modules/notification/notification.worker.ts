import { Worker } from "bullmq";
import redis from "../../config/redis";

// worker
export const notificationWorker = new Worker("notification-queue", async (job) => {
   console.log("Processing Notification Job:", job.id, job.data);
   const { userId, message, type, threadId } = job.data;

   await new Promise((resolve) => setTimeout(resolve, 800));
   return { userId, message, type, threadId };
},
   { connection: redis }
);

notificationWorker.on("completed", (job) => {
   console.log(`Worker completed job ${job.id} for user ${job.data.userId}`);
});

notificationWorker.on("failed", (job, err) => {
   console.error(`Worker job ${job?.id} failed:`, err);
});


