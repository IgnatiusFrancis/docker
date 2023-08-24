const express = require("express");
const cors = require('cors')
const sequelize = require("./config/database");
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");
const session = require("express-session"); // Import express-session, not "redis"
const { SESSION_SECRET, REDIS_URL, REDIS_PORT } = require("./config/config");
let redis = require("redis");
const RedisStore = require("connect-redis").default;
const app = express();

const redisClient = redis.createClient({
  url: `${REDIS_URL}://${REDIS_URL}:${REDIS_PORT}`,
});

redisClient.connect().catch(console.error);

let redisStore = new RedisStore({
  client: redisClient,
});

app.enable("trust proxy");
app.use(cors())
app.use(
  session({
    store: redisStore,
    secret: SESSION_SECRET,
    cookie: {
      secure: false,
      resave: false,
      saveUninitialized: false,
      httpOnly: true,
      maxAge: 60000,
    },
  })
);

app.use(express.json());

app.use("/api", postRoutes);
app.use("/api", userRoutes);

const port = process.env.PORT || 3000;

sequelize
  .sync() // Sync models with the database
  .then(() => {
    app.listen(port, () => console.log(`Listening on port ${port}`));
  })
  .catch((error) => {
    console.error("Error syncing models:", error);
  });
