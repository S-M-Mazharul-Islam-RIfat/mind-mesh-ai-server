"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllCache = exports.deleteSingleCache = exports.getCache = exports.setCache = void 0;
const redis_1 = __importDefault(require("../config/redis"));
const setCache = async (key, data, ttl = 1200) => {
    await redis_1.default.set(key, JSON.stringify(data), 'EX', ttl);
};
exports.setCache = setCache;
const getCache = async (key) => {
    const cached = await redis_1.default.get(key);
    return cached ? JSON.parse(cached) : null;
};
exports.getCache = getCache;
const deleteSingleCache = async (key) => {
    await redis_1.default.del(key);
};
exports.deleteSingleCache = deleteSingleCache;
const deleteAllCache = async (key) => {
    await redis_1.default.del(key);
};
exports.deleteAllCache = deleteAllCache;
//# sourceMappingURL=cache.js.map