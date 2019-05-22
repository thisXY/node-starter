const LOCAL = require('./local');

// 开发环境配置
module.exports = {
  ...LOCAL,
  // 环境
  ENV: 'development',
  // 手机验证码
  MOBILE_CODE: 12345,
};
