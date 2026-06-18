import Redis from 'ioredis';

let redisClient: Redis | null = null;

export function getRedisClient(): Redis {
  if (!redisClient) {
    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

    redisClient = new Redis(redisUrl, {
      maxRetriesPerRequest: 3,
      enableReadyCheck: true,
      lazyConnect: true,
    });

    redisClient.on('connect', () => {
      console.log('✅ Redis connected successfully');
    });

    redisClient.on('error', (err) => {
      console.error('Redis connection error:', err);
    });

    redisClient.connect().catch((err) => {
      console.error('Failed to connect to Redis:', err);
    });
  }

  return redisClient;
}

export async function cacheGitHubData(
  key: string,
  data: any,
  ttl: number = 3600
): Promise<void> {
  const redis = getRedisClient();
  try {
    await redis.setex(key, ttl, JSON.stringify(data));
  } catch (error) {
    console.error('Redis cache set error:', error);
  }
}

export async function getCachedGitHubData<T>(key: string): Promise<T | null> {
  const redis = getRedisClient();
  try {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Redis cache get error:', error);
    return null;
  }
}

export async function invalidateCache(pattern: string): Promise<void> {
  const redis = getRedisClient();
  try {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  } catch (error) {
    console.error('Redis cache invalidation error:', error);
  }
}
