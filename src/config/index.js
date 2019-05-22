const DEV = require('./dev');
const PRD = require('./prd');

let config = {
  // 是否是开发环境
  IS_DEV: process.env.NODE_ENV === 'development',
};

if (config.IS_DEV) {
  config = { ...config, ...DEV };
}
else {
  config = { ...config, ...PRD };
}

// 当前环境配置
module.exports = {
  ...config,
  // 身份校验请求头键
  AUTH_CHECK_KEY: 'authorization',
  // 手机验证码 (闭区间)
  MOBILE_CODE_INTERVAL: [10000, 99999],
  // 手机验证码有效时长 (ms)
  MOBILE_CODE_DURATION: 1000 * 30, // 30秒
  // 登录口令有效时长 (ms)
  SIGN_IN_ACCESS_TOKEN_DURATION: 1000 * 60 * 60 * 24 * 2, // 48小时
};
