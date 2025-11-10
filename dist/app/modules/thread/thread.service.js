"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreadServices = void 0;
const redis_1 = __importDefault(require("../../config/redis"));
const cache_1 = require("../../utils/cache");
const thread_model_1 = require("./thread.model");
const createThread = async (payload) => {
    const res = await thread_model_1.ThreadModel.create(payload);
    // Invalidate all cached thread lists
    const pattern = 'threads:*';
    const keys = await redis_1.default.keys(pattern);
    if (keys.length > 0) {
        (0, cache_1.deleteAllCache)(keys);
    }
    return res;
};
const getAllThread = async (payload) => {
    const page = payload.page;
    const limit = payload.limit;
    const skip = (page - 1) * limit;
    const query = payload.search ? { title: { $regex: payload.search, $options: 'i' } } : {};
    // Create a unique cache key for pagination
    const cacheKey = `threads:page=${page}:limit=${limit}:search=${payload.search || ''}`;
    // Try to get from cache
    const cached = await (0, cache_1.getCache)(cacheKey);
    if (cached) {
        return cached;
    }
    const threads = await thread_model_1.ThreadModel.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
    const total = await thread_model_1.ThreadModel.countDocuments(query);
    const res = { threads, total, totalPages: Math.ceil(total / limit) };
    await (0, cache_1.setCache)(cacheKey, res, 1200);
    return res;
};
const getSingleThread = async (id) => {
    const cacheKey = `${id}`;
    const cached = await (0, cache_1.getCache)(cacheKey);
    if (cached) {
        return cached;
    }
    const res = await thread_model_1.ThreadModel.findById(id);
    await (0, cache_1.setCache)(cacheKey, res, 1200);
    return res;
};
exports.ThreadServices = {
    createThread,
    getAllThread,
    getSingleThread,
};
//# sourceMappingURL=thread.service.js.map