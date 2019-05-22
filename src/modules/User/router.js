// 中间件
const { authCheck, paramsCheck } = require('../../router/middleware');
// 控制器
const {
  signInForMobile,
  sendMobileCode,
  getInfo,
} = require('./controller');

// 前缀
const prefix = '/user';

// 路由列表 (注: GET请求参数均为String)
const routers = [
  /**
   * 手机登录
   * @param mobile 手机号
   * @param mobileCode 手机验证码
   */
  ['post', '/sign_in_for_mobile', signInForMobile, {
    middleware: [paramsCheck({
      mobile: ['required', 'isString'],
      // 自定义校验规则参数
      mobileCode: [['required', ['缺少参数mobileCode']], 'isMobileCode'],
    })],
    showFields: ['_id', 'accessToken', 'accessTokenEndAt', 'isAutoSignUp'],
  }],

  /**
   * 发送手机验证码
   * @param mobile 手机号
   */
  ['post', '/send_mobile_code', sendMobileCode, {
    middleware: [paramsCheck({
      mobile: ['required', 'isString'],
    })],
  }],

  /**
   * 获取用户信息
   */
  ['get', '/get_user_info', getInfo, {
    middleware: [authCheck],
    hideFields: ['accessToken', 'accessTokenEndAt'],
  }],
];

module.exports = {
  prefix,
  routers,
};
