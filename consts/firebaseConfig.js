require('dotenv').config();
const googleApiKey = process.env.GOOGLE_API_KEY;
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const googleOauthRedirectUri = process.env.GOOGLE_OAUTH_REDIRECT_URI;

const naverClientId = process.env.NAVER_CLIENT_ID;
const naverClientSecret = process.env.NAVER_CLIENT_SECRET;
const naverOauthRedirectUri = process.env.NAVER_OAUTH_REDIRECT_URI;
const naverState = process.env.NAVER_STATE;

module.exports = {
  googleApiKey,
  googleClientId,
  googleClientSecret,
  googleOauthRedirectUri,
  naverClientId,
  naverClientSecret,
  naverOauthRedirectUri,
  naverState,
};
