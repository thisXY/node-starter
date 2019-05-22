// 生产环境配置
module.exports = {
  // 环境
  ENV: 'production',
  // 应用端口
  PORT: 3021,
  // 跨域白名单
  ALLOW_ORIGINS: [],
  // 数据库
  DATABASE: {
    // 数据库名
    NAME: 'node_starter',
    // 用户名 (无用户名为空字符串)
    USERNAME: 'username',
    // 密码 (无用户名为空字符串)
    PASSWORD: 'password',
    // uri
    URI: 'localhost',
    // 端口
    PORT: 27017,
  },
};
