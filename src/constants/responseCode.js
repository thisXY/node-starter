// 应用CODE
const APP_CODE = 1001;

// 请求响应CODE: [code, code信息, 是否可自定义code信息(若自定义,将返回一个函数接受自定义信息)]
const CODE = {
  // 成功
  SUCCESS: [0, 'success'],
  // 服务器异常
  SERVER_ERROR: [500, 'server error', true],
  // 请求数据校验失败
  RESPONSE_CHECK_FAIL: [403001, 'response check fail', true],

  // 用户模块 区间:(1000, 2000)
  USER: {
    INVALID: [1001, '无效用户'],
    ACCESS_TOKEN_EXPIRED: [1002, '登录已过期'],
    ACCESS_TOKEN_INVALID: [1003, '无效的accessToken'],
    SING_IN_CODE_EXPIRED: [1004, '登录失败: 验证码无效或已过期'],
  },

  // ...

};

/**
 * 请求响应CODE自定义处理 (拼接应用CODE; 可自定义code信息)
 */
const customCode = code => {
  Object.keys(code).forEach(key => {
    if (Object.prototype.toString.call(code[key]) === '[object Object]') {
      customCode(code[key]);
    }
    else {
      // 拼接应用CODE (成功不拼接)
      const keyCode = key === 'SUCCESS' ? code[key][0] : parseInt(`${APP_CODE}${code[key][0]}`, 10);
      const keyMessage = code[key][1];
      // 自定义code信息
      if (code[key][2]) {
        code[key] = message => [keyCode, message || keyMessage];
      }
      else {
        code[key] = [keyCode, keyMessage];
      }
    }
  });
};
customCode(CODE);

module.exports = CODE;
