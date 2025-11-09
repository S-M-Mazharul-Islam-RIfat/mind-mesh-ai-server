import IORedis from 'ioredis';

const redis = new IORedis({
   host: '127.0.0.1',
   port: 6379,
   maxRetriesPerRequest: null,
});

redis.on('connect', () => {
   console.log('Connected to Redis');
});

redis.on('error', (err) => {
   console.error('Redis connection error:', err);
});

export default redis;
