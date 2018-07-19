/**
 * @author songchengen
 * @date 2018/7/19
 * @description koa2-event-router
 */

const EventRouter = require('./EventRouter');

global.router = global.router || EventRouter;

module.exports = (config) => {
  router.run(config);
  return async (ctx, next) => {
    router.emit(`${ctx.method.toLowerCase()} ${ctx.path}`, ctx, next);
  };
};
