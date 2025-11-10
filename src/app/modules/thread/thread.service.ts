import redis from "../../config/redis";
import { deleteAllCache, getCache, setCache } from "../../utils/cache";
import { TThread } from "./thread.interface";
import { ThreadModel } from "./thread.model";

const createThread = async (payload: TThread) => {
   const res = await ThreadModel.create(payload);
   // Invalidate all cached thread lists
   const pattern = 'threads:*';
   const keys = await redis.keys(pattern);
   if (keys.length > 0) {
      deleteAllCache(keys);
   }
   return res;
}

const getAllThread = async (payload: { page: number, limit: number, search: string }) => {
   const page = payload.page;
   const limit = payload.limit;
   const skip = (page - 1) * limit;
   const query = payload.search ? { title: { $regex: payload.search, $options: 'i' } } : {};


   // Create a unique cache key for pagination
   const cacheKey = `threads:page=${page}:limit=${limit}:search=${payload.search || ''}`;

   // Try to get from cache
   const cached = await getCache(cacheKey);
   if (cached) {
      return cached;
   }

   const threads = await ThreadModel.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);


   const total = await ThreadModel.countDocuments(query);
   const res = { threads, total, totalPages: Math.ceil(total / limit) };

   await setCache(cacheKey, res, 1200);

   return res;
}

const getSingleThread = async (id: string) => {
   const cacheKey = `${id}`
   const cached = await getCache(cacheKey);
   if (cached) {
      return cached;
   }

   const res = await ThreadModel.findById(id);
   await setCache(cacheKey, res, 1200);

   return res;
}

export const ThreadServices = {
   createThread,
   getAllThread,
   getSingleThread,
}