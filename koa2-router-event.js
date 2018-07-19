/**
 * @author songchengen
 * @date 2018/7/19
 * @description 事件驱动的路由中间件
 */

const EventEmitter = require('events');
const fs = require('fs');
// eslint-disable-next-line prefer-destructuring
const join = require('path').join;

/**
 * 先使用node提供的模块，之后将重写此模块，提供only功能，即只允许同一路由注册一次
 */
class RouterEvent extends EventEmitter {
  /**
   * 扫描注册路由
   * @param {String} path 扫描路劲
   * @param {}RegExp filename 匹配文件名的正则表达式
   */
  // eslint-disable-next-line class-methods-use-this
  run({ path, filename }) {
    if (!path) throw new Error('path is not be empty');
    console.log('loading...');
    const readDir = (_path, _filename = /\.controller\.js$/) => {
      fs.readdirSync(_path).forEach((f) => {
        console.log(f);
        const fpath = join(_path, f);
        if (fs.statSync(fpath).isDirectory()) {
          readDir(fpath, _filename);
        } else if (_filename && _filename.test(f)) {
          // eslint-disable-next-line global-require,import/no-dynamic-require
          require(fpath);
        }
      });
    };
    readDir(path, filename);
    console.log('start success');
  }
}

global.router = global.router || new RouterEvent();

/**
 * 先扫描路由文件
 * @param config
 * @returns {Function}
 */
module.exports = (config) => {
  router.run(config);
  return async (ctx, next) => {
    router.emit(`${ctx.method.toLowerCase()} ${ctx.path}`, ctx, next);
  };
};
