const Validator = require('koa-bouncer').Validator;
const Error = require('../libs/Error');
const CODE = require('../constants/responseCode');
const CONFIG = require('../config');

// 自定义koa-bouncer校验规则 (https://www.npmjs.com/package/koa-bouncer)
module.exports = () => {
  // 手机验证码
  Validator.addMethod('isMobileCode', function (tip = new Error(CODE.USER.SING_IN_CODE_EXPIRED)) {
    this
      .isInt(tip)
      .checkPred(mobileCode => {
        return mobileCode >= CONFIG.MOBILE_CODE_INTERVAL[0] && mobileCode <= CONFIG.MOBILE_CODE_INTERVAL[1];
      }, tip);

    return this;
  });

  // ...

};
