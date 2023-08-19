// redisUtil.js
import Redis from "ioredis"
const redis = new Redis()

function storeUserLocation(userId, location) {
  return redis.set(`user:${userId}:location`, JSON.stringify(location))
}

async function getUserLocation(userId) {
  const location = await redis.get(`user:${userId}:location`)
  return location ? JSON.parse(location) : null
}

export default {
  storeUserLocation,
  getUserLocation,
}
