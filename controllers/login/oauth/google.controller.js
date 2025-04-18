const {
  googleClientId,
  googleOauthRedirectUri,
  googleClientSecret,
} = require("../../../consts/firebaseConfig");

const { JWT_SECRET_KEY, FRONT_URL } = require("../../../consts/app");

const axios = require("axios");
const jwt = require("jsonwebtoken");

const { InvaildRequestError } = require("../../../utils/error");
const {
  findUserEmailBoolean,
  findDeletedUserEmailBoolean,
} = require("../../../services/user/user.service");

const googleController = require("express").Router();
const client = require("../../../utils/redis");
/** google oauth
 * /api/login/google-oauth
 */
googleController.get("/google-oauth", (req, res) => {
  const oauthEntryUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${googleOauthRedirectUri}&response_type=code&scope=email profile`;
  res.redirect(oauthEntryUrl);
});

/** google-oauth-redirect
 * /api/login/google-oauth-redirect
 */
googleController.get("/google-oauth-redirect", async (req, res) => {
  const { code } = req.query;
  const redirectUrl = `https://oauth2.googleapis.com/token`;

  try {
    const request = await axios.post(redirectUrl, {
      code,
      client_id: googleClientId,
      client_secret: googleClientSecret,
      redirect_uri: googleOauthRedirectUri,
      grant_type: "authorization_code",
    });

    const { error, error_description } = request.data;
    if (error && error_description) {
      throw new InvaildRequestError(error, error_description);
    }

    const { access_token } = request.data;
    const requestUserinfoUrl = `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${access_token}`;
    const requestUserinfo = await axios.get(requestUserinfoUrl);

    if (requestUserinfo.status === 200) {
      const { email, name, picture } = requestUserinfo.data;
      const result = await findUserEmailBoolean({ email });

      if (!result) {
        const register_google = jwt.sign(
          { email, name, picture },
          JWT_SECRET_KEY
        );
        res.cookie("register_google", register_google, {
          httpOnly: true,
          maxAge: 60 * 60 * 1000,
        });
        return res.redirect(`${FRONT_URL}register?social=1`);
      }

      const IsDeletedUser = await findDeletedUserEmailBoolean({ email });
      if (IsDeletedUser) {
        return res.redirect(`${FRONT_URL}login?user=deleted`);
      }

      req.session.loginState = true;
      req.session.user = { email };
      console.log("세션 저장 전:", req.session);
      console.log("Request Headers:", req.headers);
      console.log("Google Redirect 세션 ID:", req.sessionID);
      req.session.save(async (err) => {
        if (err) {
          console.error("세션 저장 실패:", err);
          return res.status(500).send("세션 저장 실패");
        }
        const redisData = await client
          .get(`sess:${req.sessionID}`)
          .then((data) => {
            console.log("Redis에 저장된 세션 데이터:", data);
          });
        console.log("Redis 세션 확인:", redisData);
        res.cookie("connect.sid", `s:${req.sessionID}`, {
          httpOnly: true,
          sameSite: "None",
          secure: true,
          maxAge: 60 * 60 * 1000,
          path: "/",
        });
        console.log("Set-Cookie 헤더:", res.get("Set-Cookie"));
        // res.redirect(FRONT_URL);
        return res.status(200).json({ result: true, message: "로그인 성공" });
      });
    }
  } catch (e) {
    console.error("Google OAuth 에러:", e.message);
    res.status(500).send("로그인 처리 중 오류 발생");
  }
});

googleController.get("/google-get-data", async (req, res) => {
  const register_google = req.cookies.register_google;

  try {
    const registerData = jwt.verify(register_google, JWT_SECRET_KEY);

    return res.clearCookie("register_google").json({
      result: true,
      data: registerData,
    });
  } catch (e) {
    return res.json({
      result: false,
      message: "구글 로그인에 실패했습니다. 다시 시도해주세요.",
    });
  }
});

module.exports = googleController;
