module.exports = {
  REDIS_URL: process.env.REDIS_URL || "redis",
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  REDIS_PORT: process.env.REDIS_PORT || 6379,
  DB_IP: process.env.DB_IP,
  DB_PORT: process.env.DB_PORT || 5432,
  DB: process.env.DB || "postgres",
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  SESSION_SECRET: process.env.SESSION_SECRET,
};
