require('dotenv').config();
const googleApiKey = process.env.GOOGLE_API_KEY;
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const googleOauthRedirectUri = process.env.GOOGLE_OAUTH_REDIRECT_URI;

const kakaoClientId = process.env.KAKAO_CLIENT_ID;
const kakaoOauthRedirectUri = process.env.KAKAO_OAUTH_REDIRECT_URI;

module.exports = {
  googleApiKey,
  googleClientId,
  googleClientSecret,
  googleOauthRedirectUri,
  kakaoClientId,
  kakaoOauthRedirectUri,
};
