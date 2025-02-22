const cache = new Map()

export const cacheData = (key, data, ttl = 3600000) => {
  // TTL default is 1 hour
  const now = new Date().getTime()
  cache.set(key, { data, expiry: now + ttl })
}

export const getCachedData = (key) => {
  const cached = cache.get(key)
  if (!cached) return null

  const now = new Date().getTime()
  if (now > cached.expiry) {
    cache.delete(key)
    return null
  }

  return cached.data
}

export const clearCache = () => {
  cache.clear()
}

