/**
 * @author songchengen
 * @date 2018/7/19
 * @description 系统入口
 */

const Koa = require('koa');
const eventRouter = require('./koa2-router-event');

const app = new Koa();

router.on('get /', async (ctx, next) => {
  ctx.body = 'hello world';
  await next();
});

app.use(eventRouter);

app.listen(3000);
