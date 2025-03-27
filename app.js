const {
  SESSION_NAME,
  SESSION_SECRET_KEY,
  FRONT_URL,
  NODE_ENV,
} = require("./consts/app");
require("./db_init");
const apiController = require("./controllers");
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { RedisStore } = require("connect-redis");
const cors = require("cors");
const client = require("./utils/redis");

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
    allowedHeaders: ["Content-Type", "Authorization", "X-Custom-Header"],
  })
);

app.use(cookieParser());
app.use(
  session({
    name: SESSION_NAME,
    secret: SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: new RedisStore({ client: client, ttl: 86400 }),
    cookie: {
      secure: NODE_ENV === "production",
      httpOnly: true,
      sameSite: NODE_ENV === "production" ? "None" : "Lax",
      path: "/",
    },
  })
);
console.log("SESSION_NAME:", SESSION_NAME);
console.log("SESSION_SECRET_KEY:", SESSION_SECRET_KEY);
console.log("FRONT_URL:", FRONT_URL);
console.log("process.env.NODE_ENV:", NODE_ENV);
app.use("/images", express.static("images"));
app.use("/api", apiController);

module.exports = app;
