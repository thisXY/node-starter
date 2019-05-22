const Error = require('../libs/Error');
const CODE = require('../constants/responseCode');
const { filter } = require('../utils/json');

/**
 * 执行控制器并响应请求
 * @param ctx
 * @param next
 * @param controller 控制器
 * @param showFields 显示字段
 * @param hideFields 隐藏字段
 */
exports.runController = async (ctx, next, controller, { showFields, hideFields } = {}) => {
  // GET请求可能通过校验把校验结果参数值设置在ctx.request.body
  // 控制器可有参数: ctx next
  let data = await controller({ ...ctx.request.query, ...ctx.request.body }, { ctx, next });

  if (!(data instanceof Error)) {
    // 字段过滤
    const filterFields = (data, fields, isShow) => {
      let result = data;
      const filterFields = data => {
        if (Object.prototype.toString.call(data) === '[object Object]' && data._doc) {
          data = data._doc;
        }
        return filter(data, fields, isShow);
      };
      // 仅处理一层组数
      if (data instanceof Array) {
        result = [];
        data.forEach(data => {
          result.push(filterFields(data));
        });
      }
      else {
        result = filterFields(data);
      }
      return result;
    };

    // 显示字段过滤
    if (showFields && showFields.length > 0) {
      data = filterFields(data, showFields, true);
    }
    // 隐藏字段过滤
    if (hideFields && hideFields.length > 0) {
      data = filterFields(data, hideFields, false);
    }
  }
  this.response(ctx, data);
};

/**
 * 响应请求
 * @param ctx
 * @param data 成功数据 || 异常
 */
exports.response = (ctx, data) => {
  // 异常
  if (data instanceof Error) {
    ctx.body = {
      data: false,
      code: data.code,
      message: data.message,
    };
  }
  // 成功数据
  else {
    ctx.body = {
      data: data === undefined ? true : data,
      code: CODE.SUCCESS[0],
      message: CODE.SUCCESS[1],
    };
  }
};
