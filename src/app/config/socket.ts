import { Server as SocketIOServer } from "socket.io";
import type { Server as HTTPServer } from "http";

let io: SocketIOServer;

// Initialize Socket.IO
export const initSocket = (httpServer: HTTPServer) => {
   io = new SocketIOServer(httpServer, {
      cors: {
         origin: "http://localhost:5173",
         credentials: true,
      },
   });

   io.on("connection", (socket) => {
      console.log(`User connected: ${socket.id}`);

      // User joins a thread room
      socket.on("join_thread", (threadId) => {
         socket.join(threadId);
      });

      // Broadcast new comments
      socket.on("new_comment_created", ({ threadId, comment }) => {
         socket.to(threadId).emit("new_comment_created", comment);
      });

      // Map socket to user
      socket.on("register_user", (userId: string) => {
         socket.join(userId);
         console.log(`User ${userId} registered with socket ${socket.id}`);
      });

      socket.on("disconnect", () => {
         console.log(`User disconnected: ${socket.id}`);
      });
   });

   console.log("Socket.IO initialized");
   return io;
};

// Getter
export const getIO = () => {
   if (!io) {
      throw new Error("Socket.IO not initialized!");
   }
   return io;
};
