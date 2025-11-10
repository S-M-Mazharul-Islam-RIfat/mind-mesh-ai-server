"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./app/config"));
const mongoose_1 = __importDefault(require("mongoose"));
const redis_1 = __importDefault(require("./app/config/redis"));
const socket_1 = require("./app/config/socket");
const notification_event_1 = require("./app/modules/notification/notification.event");
async function main() {
    try {
        // connect MongoDB
        await mongoose_1.default.connect(config_1.default.database_url);
        console.log("Database connected successfully");
        // test Redis
        await redis_1.default.ping();
        console.log("Redis is running");
        // create HTTP server
        const httpServer = http_1.default.createServer(app_1.default);
        // initialize Socket.IO
        (0, socket_1.initSocket)(httpServer);
        // load notification event listener
        notification_event_1.notificationEvents;
        // start server
        const PORT = config_1.default.server_port || 5000;
        httpServer.listen(PORT, () => {
            console.log(`Mind Mesh AI running on port ${PORT}`);
        });
    }
    catch (err) {
        console.error("Server failed to start", err);
    }
}
main();
//# sourceMappingURL=server.js.map