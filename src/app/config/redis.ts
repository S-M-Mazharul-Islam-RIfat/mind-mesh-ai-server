import IORedis from 'ioredis';
import config from '.';

const redis = new IORedis({
   host: String(config.redis_host),
   port: Number(config.redis_port),
   maxRetriesPerRequest: null,
});

redis.on('connect', () => {
   console.log('Connected to Redis');
});

redis.on('error', (err) => {
   console.error('Redis connection error:', err);
});

export default redis;