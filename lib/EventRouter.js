/* eslint-disable object-shorthand,prefer-rest-params,import/no-dynamic-require,global-require */
/**
 * @author songchengen
 * @date 2018/7/19
 * @description EventRouter
 */

const fs = require('fs');
const { join } = require('path');

/**
 * console.log
 * @param target
 * @param content
 */
function log(target, content) {
  const styles = {
    cyan: ['\x1B[36m', '\x1B[39m'],
    green: ['\x1B[32m', '\x1B[39m'],
    yellow: ['\x1B[33m', '\x1B[39m'],
  };

  if (!styles[target]) return;

  console.log(`${styles[target][0]}%s${styles[target][1]}`, content);
}

const EventRouter = {};

/**
 * router set
 * @type {{}}
 */
EventRouter.eventsSet = {};

/**
 * register router
 * @param {String} key router method and path
 * @param {Function} fn controller
 */
EventRouter.on = function (key, fn) {
  if (this.eventsSet[key]) throw new Error(`The same route [${key}] cannot be registered multiple times`);
  this.eventsSet[key] = fn;
  return true;
}.bind(EventRouter);

/**
 * call controller
 * @param {String} key
 * @param {KoaContent} ctx
 * @param {KoaNext} next
 */
EventRouter.emit = async function (key, ctx, next) {
  if (!this.eventsSet[key]) {
    await next();
  } else {
    this.eventsSet[key].call(ctx.app, ctx, next);
  }
}.bind(EventRouter);

/**
 * Automatic scanning
 * @param {String} path
 * @param {RegExp} filename
 */
EventRouter.run = function ({ path, filename = /\.(js|ts)$/ }) {
  if (!path) throw new Error('Path can not be empty!');

  if (!(filename instanceof RegExp)) throw new TypeError(`Filename must be RegExp, but get ${typeof filename}`);

  log('cyan', 'Waiting register routers...');

  const scanDir = (scanPath, matchReEexp) => {
    fs.readdirSync(scanPath).forEach((f) => {
      const fpath = join(scanPath, f);
      if (fs.statSync(fpath).isDirectory()) {
        scanDir(fpath, matchReEexp);
      } else if ((matchReEexp && matchReEexp.test(f)) || /\.(js|ts)$/.test(f)) {
        require(fpath);
        log('yellow', fpath);
      }
    });
  };

  scanDir(path, filename);

  log('green', 'Registration success');
};


module.exports = EventRouter;
