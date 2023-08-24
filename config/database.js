// config/database.js
const { Sequelize } = require("sequelize");
const { DB_IP, DB, DB_USER, DB_PASSWORD, DB_PORT } = require("./config");

const sequelize = new Sequelize(DB, DB_USER, DB_PASSWORD, {
  host: DB_IP,
  port: DB_PORT,
  dialect: "postgres",
  dialectOptions: {
    ssl: process.env.DB_SSL == "true",
  },
});

const maxRetries = 5;
let retryCount = 0;

const connectWithRetry = () => {
  if (retryCount >= maxRetries) {
    console.error(
      "Maximum retries reached. Unable to connect to the database."
    );
    return;
  }

  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((error) => {
      console.error("Unable to connect to the database:", error);
      retryCount++;
      setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
    });
};

connectWithRetry();

module.exports = sequelize;
