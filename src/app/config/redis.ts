import IORedis from 'ioredis';
import config from '.';

const redis = new IORedis({
   host: config.redis_host,
   port: config.redis_port,
   password: config.redis_password,
   tls: {},
   maxRetriesPerRequest: null,
});

redis.on('connect', () => {
   console.log('Connected to Redis');
});

redis.on('error', (err) => {
   console.error('Redis connection error:', err);
});

export default redis;
