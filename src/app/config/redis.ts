import IORedis from 'ioredis';
import config from '.';
let redis: IORedis;

if (config.redis_url) {
   redis = new IORedis(config.redis_url, {
      maxRetriesPerRequest: null,
   });
} else {
   redis = new IORedis({
      host: String(config.redis_host || '127.0.0.1'),
      port: Number(config.redis_port || 6379),
      maxRetriesPerRequest: null,
   });
}

redis.on('connect', () => {
   console.log('Connected to Redis');
});

redis.on('error', (err) => {
   console.error('Redis connection error:', err);
});

export default redis;
