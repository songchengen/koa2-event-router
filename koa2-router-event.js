/**
 * @author songchengen
 * @date 2018/7/19
 * @description 事件驱动的路由中间件
 */

const EventEmitter = require('events');

global.router = global.router || new EventEmitter();

module.exports = async (ctx, next) => {
  router.emit(`${ctx.method.toLowerCase()} ${ctx.path}`, ctx, next);
};
