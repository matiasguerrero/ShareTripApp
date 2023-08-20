// redisUtil.js
import Redis from "ioredis"

// Configura la conexión para que apunte a redis_internal en el puerto 6380
const redis = new Redis({
  host: "redis_internal",
  port: 6379, // Puerto que corresponde a redis_internal
})

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
