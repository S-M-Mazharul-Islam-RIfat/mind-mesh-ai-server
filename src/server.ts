import http from 'http';
import app from './app';
import config from './app/config';
import mongoose from 'mongoose';
import { Server as SocketIOServer } from 'socket.io';

let server: http.Server;

async function main() {
   try {
      // Connect MongoDB
      await mongoose.connect(config.database_url as string);
      console.log('Database connected successfully');

      // Create HTTP server and attach app
      const httpServer = http.createServer(app);

      // Setup Socket.IO
      const io = new SocketIOServer(httpServer, {
         cors: {
            origin: 'http://localhost:5173',
            credentials: true,
         },
      });

      // Listen for connections
      io.on('connection', (socket) => {
         console.log(`New user connected: ${socket.id}`);

         // When a user opens a thread, they join that thread room
         socket.on("join_thread", (threadId) => {
            socket.join(threadId);
         });

         // When a new comment is created for a thread
         socket.on("new_comment_created", ({ threadId, comment }) => {
            // Broadcast only to others in that thread room
            socket.to(threadId).emit("new_comment_created", comment);
         });

         // Handle disconnect
         socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
         });
      });

      // Start server
      const PORT = config.port || 5000;
      server = httpServer.listen(PORT, () => {
         console.log(`Mind Mesh AI is listening on port ${PORT}`);
      });
   } catch (err) {
      console.error('Server failed to start', err);
   }
}

main();
