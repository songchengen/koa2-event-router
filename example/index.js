/* eslint-disable import/no-extraneous-dependencies */
/**
 * @author songchengen
 * @date 2018/7/19
 * @description 程序入口
 */

const Koa = require('koa');
const eventRouter = require('../lib');

const app = new Koa();

/**
 * 支持在注入中间件之前注册路由
 */
router.on('get /', async (ctx, next) => {
  ctx.body = 'hello world';
  await next();
});

app.use(eventRouter({
  path: `${__dirname}/src`,
  filename: /\.controller\.js$/,
}));

app.listen(9999);
