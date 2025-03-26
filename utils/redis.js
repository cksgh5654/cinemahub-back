const Redis = require("ioredis");

const client = new Redis({
  host: "redis-14565.c340.ap-northeast-2-1.ec2.redns.redis-cloud.com",
  port: 14565,
  username: "default",
  password: "0p7N9kF6rFOwnGuoYmWT0hEHnYC87bEH",
});

client.on("connect", () => console.log("Redis 연결 성공"));
client.on("error", (err) => console.log("Redis 연결 에러:", err));

module.exports = client;
