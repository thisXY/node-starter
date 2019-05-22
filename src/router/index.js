const { runController } = require('../appUtils/response');
const validations = require('../appUtils/validations');
/**
 * 路由列表
 * 路由对象结构: [请求类型, 路由名, 控制器, { middleware: [中间件, ...], showFields: [显示字段, ...], hideFields: [隐藏字段, ...] }]
 * 请求类型、路由名、控制器为必配
 */
const routers = [
  require('../modules/User/router'),
  // ...

];

// 自定义koa-bouncer校验规则
validations();
// 路由装载
module.exports = routers.map(routers => {
  const koaRouter = require('koa-router')();
  // 前缀
  koaRouter.prefix(routers.prefix);
  // 路由
  routers.routers.forEach(router => {
    koaRouter[router[0]](router[1], ...((router[3] || {}).middleware || []), (ctx, next) => runController(ctx, next, router[2], router[3]));
  });
  return koaRouter;
});
