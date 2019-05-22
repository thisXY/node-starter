// 本地配置: 拷贝该文件重命名为local.js在当前目录并配置你的开发环境配置
module.exports = {
  // 应用端口
  PORT: 3000,
  // 跨域白名单
  ALLOW_ORIGINS: '*',
  // 数据库
  DATABASE: {
    // 数据库名
    NAME: 'node_starter',
    // 用户名 (无用户名为空字符串)
    USERNAME: '',
    // 密码 (无密码为空字符串)
    PASSWORD: '',
    // uri
    URI: 'localhost',
    // 端口
    PORT: 27017,
  },
};
