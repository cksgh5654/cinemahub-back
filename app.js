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

app.use(cookieParser());
app.use(
  session({
    name: SESSION_NAME,
    secret: SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: new RedisStore({ client: client }),
    cookie: {
      secure: true, // HTTPS 환경이므로 true
      httpOnly: true,
      sameSite: "None", // 크로스 사이트 요청을 위해 필요
      path: "/", // 쿠키 경로 명시
    },
  })
);
console.log("SESSION_NAME:", SESSION_NAME);
console.log("SESSION_SECRET_KEY:", SESSION_SECRET_KEY);
app.use("/images", express.static("images"));
app.use("/api", apiController);

module.exports = app;
