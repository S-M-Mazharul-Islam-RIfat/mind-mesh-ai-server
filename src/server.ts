import http from "http";
import app from "./app";
import config from "./app/config";
import mongoose from "mongoose";
import redis from "./app/config/redis";
import { initSocket } from "./app/config/socket";
import { notificationEvents } from "./app/modules/notification/notification.event";

async function main() {
   try {
      // connect MongoDB
      await mongoose.connect(config.database_url as string);
      console.log("Database connected successfully");

      // test Redis
      await redis.ping();
      console.log("Redis is running");

      // create HTTP server
      const httpServer = http.createServer(app);

      // initialize Socket.IO
      initSocket(httpServer);

      // load notification event listener
      notificationEvents;

      // start server
      const PORT = config.server_port || 5000;
      httpServer.listen(PORT, () => {
         console.log(`Mind Mesh AI running on port ${PORT}`);
      });
   } catch (err) {
      console.error("Server failed to start", err);
   }
}

main();
