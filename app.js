const { SESSION_NAME, SESSION_SERECT_KEY } = require("./consts/app");
require("./db_init");
const apiController = require("./controllers");
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const Redis = require("ioredis");

const redisClient = new Redis({
  host: "redis-14565.c340.ap-northeast-2-1.ec2.redns.redis-cloud.com",
  port: 14565,
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    name: SESSION_NAME,
    secret: SESSION_SERECT_KEY,
    resave: false,
    saveUninitialized: false,
    store: new RedisStore({ client: redisClient }),
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "None",
    },
  })
);

app.use("/images", express.static("images"));
app.use(cookieParser());
app.use("/api", apiController);

module.exports = app;
