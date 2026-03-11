const TTL_MS = 5 * 60 * 1000;

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cache = new Map<string, CacheEntry<unknown>>();

export function getCached<T>(key: string): T | null {
  const entry = cache.get(key) as CacheEntry<T> | undefined;
  if (!entry) return null;
  if (Date.now() - entry.timestamp > TTL_MS) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

export function getCachedOrStale<T>(key: string): T | null {
  const entry = cache.get(key) as CacheEntry<T> | undefined;
  return entry ? entry.data : null;
}

export function setCached<T>(key: string, data: T): void {
  cache.set(key, { data, timestamp: Date.now() });
}
