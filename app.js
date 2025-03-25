const { SESSION_NAME, SESSION_SECRET_KEY, FRONT_URL } = require("./consts/app");
require("./db_init");
const apiController = require("./controllers");
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { RedisStore } = require("connect-redis");
const Redis = require("ioredis");
const cors = require("cors");

const client = new Redis({
  host: "redis-14565.c340.ap-northeast-2-1.ec2.redns.redis-cloud.com",
  port: 14565,
  username: "default",
  password: "0p7N9kF6rFOwnGuoYmWT0hEHnYC87bEH",
});

client.on("connect", () => console.log("Redis 연결 성공"));
client.on("error", (err) => console.log("Redis 연결 에러:", err));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("trust proxy", 1);
app.use(
  cors({
    origin: FRONT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(
  session({
    name: "connect.sid",
    secret: SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: new RedisStore({ client: client }),
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    },
  })
);
console.log("SESSION_SECRET_KEY:", SESSION_SECRET_KEY);
app.use("/images", express.static("images"));
app.use(cookieParser());
app.use("/api", apiController);

module.exports = app;
