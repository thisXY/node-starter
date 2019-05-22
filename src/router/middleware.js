const { getInfoForAccessToken } = require('../modules/User/controller');
const Error = require('../libs/Error');
const { response } = require('../appUtils/response');
const CODE = require('../constants/responseCode');
const CONFIG = require('../config');

/**
 * 身份验证 (判断请求头Key: CONFIG.AUTH_CHECK_KEY)
 * @param ctx
 * @param next
 */
exports.authCheck = async (ctx, next) => {
  if (!ctx.header[CONFIG.AUTH_CHECK_KEY]) {
    return response(ctx, new Error(CODE.USER.ACCESS_TOKEN_EXPIRED));
  }
  const userInfo = await getInfoForAccessToken(ctx.header[CONFIG.AUTH_CHECK_KEY]);
  if (userInfo instanceof Error) {
    return response(ctx, new Error(CODE.USER.ACCESS_TOKEN_EXPIRED));
  }
  // 全局保存
  global.app.userInfo = userInfo;
  await next();
};

/**
 * 请求参数bouncer校验 -> https://www.npmjs.com/package/koa-bouncer
 * 注: GET请求参数均为String (建议用校验规则格式化参数类型)
 * @param rules 校验规则 {参数名: [bouncer校验函数, ...]} || {参数名: [[bouncer校验函数, [函数参数, ...]], ...]}
 * @param ctx
 * @param next
 */
exports.paramsCheck = (rules = {}) => async (ctx, next) => {
  // 请求类型
  const method = ctx.method.toUpperCase();
  // 请求数据
  let data = method === 'GET' ? ctx.request.query : ctx.request.body;

  Object.keys(rules).forEach(param => {
    // 校验器
    let validator = method === 'GET' ? ctx.validateQuery(param) : ctx.validateBody(param);
    // 校验
    rules[param].forEach(rule => {
      if (typeof rule === 'string') {
        validator = validator[rule]();
      }
      else if (rule instanceof Array) {
        validator = validator[rule[0]](...(rule[1] || []));
      }
    });
    // 校验结果回执
    if (typeof validator.val === 'function') {
      validator = validator.val();
    }
    data = { ...data, [param]: validator };
  });

  // 校验结果回执
  ctx.request.body = data;

  await next();
};
