"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIO = exports.initSocket = void 0;
const socket_io_1 = require("socket.io");
let io;
// Initialize Socket.IO
const initSocket = (httpServer) => {
    io = new socket_io_1.Server(httpServer, {
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
        socket.on("register_user", (userId) => {
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
exports.initSocket = initSocket;
// Getter
const getIO = () => {
    if (!io) {
        throw new Error("Socket.IO not initialized!");
    }
    return io;
};
exports.getIO = getIO;
//# sourceMappingURL=socket.js.map