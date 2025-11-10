import redis from '../config/redis';

export const setCache = async (key: string, data: any, ttl = 1200) => {
   await redis.set(key, JSON.stringify(data), 'EX', ttl);
};

export const getCache = async (key: string) => {
   const cached = await redis.get(key);
   return cached ? JSON.parse(cached) : null;
};

export const deleteSingleCache = async (key: string) => {
   await redis.del(key);
};

export const deleteAllCache = async (key: string[]) => {
   await redis.del(key);
};
