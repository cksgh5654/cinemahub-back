const { vaildateEnv } = require('./regex');
require('dotenv').config();

const googleApiKey = vaildateEnv(
  'string',
  process.env.GOOGLE_API_KEY,
  'AIzaSyCkhL4fCDT2qaYGmjxFe1Rb7nG-iNtm_xw'
);

const googleClientId = vaildateEnv(
  'string',
  process.env.GOOGLE_CLIENT_ID,
  '555393982075-ouvcn4l9o8tvcjahobt03aicjgvaks6c.apps.googleusercontent.com'
);

const googleClientSecret = vaildateEnv(
  'string',
  process.env.GOOGLE_CLIENT_SECRET,
  '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'
);

const googleOauthRedirectUri = vaildateEnv(
  'url',
  process.env.GOOGLE_OAUTH_REDIRECT_URI,
  'http://localhost:8080/api/login/google/google-oauth-redirect'
);

const naverClientId = vaildateEnv(
  'string',
  process.env.NAVER_CLIENT_ID,
  'HISnEPRW5Mru1iu8HzDc'
);

const naverClientSecret = vaildateEnv(
  'string',
  process.env.NAVER_CLIENT_SECRET,
  'B2maWJ7zig'
);

const naverOauthRedirectUri = vaildateEnv(
  'url',
  process.env.NAVER_OAUTH_REDIRECT_URI,
  'http://localhost:8080/api/login/naver/callback'
);

const naverState = vaildateEnv('string', process.env.NAVER_STATE, 'test');

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
