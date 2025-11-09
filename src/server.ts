import http from "http";
import app from "./app";
import config from "./app/config";
import mongoose from "mongoose";
import redis from "./app/config/redis";
import { initSocket } from "./app/config/socket";
import { notificationEvents } from "./app/modules/notification/notification.event";

async function main() {
   try {
      // Connect MongoDB
      await mongoose.connect(config.database_url as string);
      console.log("Database connected successfully");

      // Test Redis
      await redis.ping();
      console.log("Redis is running");

      // Create HTTP server
      const httpServer = http.createServer(app);

      // Initialize Socket.IO
      initSocket(httpServer);

      // Load notification event listener (depends on getIO)
      notificationEvents;


      // Start server
      const PORT = config.port || 5000;
      httpServer.listen(PORT, () => {
         console.log(`Mind Mesh AI running on port ${PORT}`);
      });
   } catch (err) {
      console.error("Server failed to start", err);
   }
}

main();
