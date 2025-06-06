const loginController = require("express").Router();

const { SESSION_NAME } = require("../../consts/app");
const {
  createUser,
  findUserEmailBoolean,
  findUserNicknameBoolean,
} = require("../../services/user/user.service");
const googleController = require("./oauth/google.controller");
const naverController = require("./oauth/naver.controller");
const client = require("../../utils/redis");
/**
 * /api/login/google
 * /api/login/naver
 */

loginController.use("/google", googleController);
loginController.use("/naver", naverController);
// login.controller.js
loginController.post("/user", async (req, res) => {
  const { email, nickname, profile } = req.body;

  try {
    const existUser = await findUserEmailBoolean({ email });
    if (existUser) {
      throw new Error("이미 등록된 계정입니다. 로그인을 진행해주세요.");
    }

    const existNickname = await findUserNicknameBoolean({ nickname });
    if (existNickname) {
      throw new Error(
        "이미 등록된 닉네임입니다. 등록 전에 중복체크를 진행해주세요"
      );
    }

    const result = await createUser({ email, nickname, profile });
    req.session.loginState = true;
    req.session.user = { email };
    console.log("세션 저장 전:", req.session);

    req.session.save((err) => {
      if (err) {
        console.error("세션 저장 실패:", err);
        return res
          .status(500)
          .json({ result: false, message: "세션 저장 실패" });
      }
      console.log("세션 저장 후:", req.session);
      client.get(`sess:${req.sessionID}`, (err, data) => {
        if (err) console.error("Redis 조회 에러:", err);
        console.log("Redis 세션 데이터:", data);
      });
      res.cookie("connect.sid", `s:${req.sessionID}`, {
        httpOnly: true,
        sameSite: "Lax",
        secure: false,
        maxAge: 60 * 60 * 1000,
        path: "/",
      });
      return res.json({
        result: true,
        message: "계정 등록이 완료되었습니다.",
      });
    });
  } catch (e) {
    console.error(e.message);
    return res.json({
      result: false,
      message: e.message,
    });
  }
});

const generateNickname = (nickname) => {
  const randomId = Math.random().toString(10).split(".")[1].slice(0, 3);
  return `${nickname}${randomId}`;
};

loginController.post("/check-name", async (req, res) => {
  const { nickname } = req.body;

  if (!nickname) {
    return res.status(400).json({
      result: false,
      message: "닉네임을 입력해주세요.",
    });
  }

  try {
    const existNickname = await findUserNicknameBoolean({ nickname });

    if (existNickname) {
      return res.json({
        result: true,
        nickname: generateNickname(nickname),
        message: "동일한 닉네임이 존재합니다. 닉네임을 추천해드릴게요.",
      });
    }

    return res.json({
      result: true,
      nickname,
      message: "사용 가능한 닉네임입니다",
    });
  } catch (e) {
    console.error(e.message);
    return res.json({
      result: false,
      message: e.message,
    });
  }
});

loginController.get("/logout", (req, res) => {
  if (req.session.loginState) {
    req.session.destroy((err) => {
      if (err) {
        return res.json({ result: false, message: "로그아웃 실패" });
      }
      return res
        .clearCookie(SESSION_NAME)
        .json({ result: true, message: "로그아웃 완료" });
    });
  } else {
    return res.json({ result: false, message: "로그인 정보가 없습니다." });
  }
});

loginController.get("/check-login", async (req, res) => {
  console.log("Request Headers:", req.headers);
  console.log("클라이언트 connect.sid:", req.cookies["connect.sid"] || "없음");
  console.log("서버 세션 ID:", req.sessionID);
  console.log("세션 데이터:", req.session);
  const redisServerData = await client.get(`sess:${req.sessionID}`);
  console.log("Redis 조회 (서버 SID):", redisServerData);
  if (req.cookies["connect.sid"]) {
    const clientSidValue = req.cookies["connect.sid"]
      .split(".")[0]
      .split(":")[1];
    const redisClientData = await client.get(`sess:${clientSidValue}`);
    console.log("Redis 조회 (클라이언트 SID):", redisClientData);
  }
  res.json({
    result: !!req.session.loginState,
    sessionId: req.sessionID,
    redisData: await client.get(`sess:${req.sessionID}`),
    cookies: req.headers.cookie, // 클라이언트에서 전달된 쿠키 확인
  });
});

module.exports = loginController;
