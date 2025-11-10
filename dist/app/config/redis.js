"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const _1 = __importDefault(require("."));
const redis = new ioredis_1.default({
    host: String(_1.default.redis_host),
    port: Number(_1.default.redis_port),
    maxRetriesPerRequest: null,
});
redis.on('connect', () => {
    console.log('Connected to Redis');
});
redis.on('error', (err) => {
    console.error('Redis connection error:', err);
});
exports.default = redis;
//# sourceMappingURL=redis.js.map