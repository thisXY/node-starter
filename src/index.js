/* eslint-disable  no-console */
const Koa = require('koa');
const json = require('koa-json');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const cors = require('koa2-cors');
const assets = require('koa-static');
const bouncer = require('koa-bouncer');
const mongoose = require('mongoose');
const path = require('path');
const routers = require('./router');
const Error = require('./libs/Error');
const { response } = require('./appUtils/response');
const CODE = require('./constants/responseCode');
const CONFIG = require('./config');

const app = new Koa();

app.use(bodyparser({
  enableTypes: ['json', 'form', 'text'],
  multipart: true,
}));

app.use(json());

// 配置静态资源
app.use(assets(path.join(__dirname, './assets')));

// 请求头
app.use(cors({
  origin: ctx => {
    if (CONFIG.ALLOW_ORIGINS === '*') {
      return ctx.request.header.origin;
    }
    return (CONFIG.ALLOW_ORIGINS.includes(ctx.request.header.origin) ? ctx.request.header.origin : false);
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// 全局变量
app.use(async (ctx, next) => {
  global.app = { ctx, userInfo: {} };
  await next();
});

// 异常
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    // 请求参数bouncer校验失败
    if (e.bouncer) {
      if (!(e.message instanceof Error)) {
        e.message = new Error(CODE.RESPONSE_CHECK_FAIL(e.message));
      }
      response(ctx, e.message);
    }
    // 服务器异常
    else {
      console.log(e);
      response(ctx, new Error(CODE.SERVER_ERROR(e.message || e)));
    }
  }
});

// 请求参数bouncer校验
app.use(bouncer.middleware());

// 路由
routers.forEach(router => app.use(router.routes(), router.allowedMethods()));

// 日志
app.use(logger);

// 数据库
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${CONFIG.DATABASE.USERNAME
  ? `${CONFIG.DATABASE.USERNAME}:${CONFIG.DATABASE.PASSWORD}@`
  : ''}${CONFIG.DATABASE.URI}:${CONFIG.DATABASE.PORT}/${CONFIG.DATABASE.NAME}`, { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);

// listen
app.listen(CONFIG.PORT);
console.log(`starting at port ${CONFIG.PORT}\n`);

module.exports = app;
