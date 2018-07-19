/**
 * @author songchengen
 * @date 2018/7/19
 * @description api.v1.controller
 */

router.on('get /api/v1/test', async (ctx) => {
  ctx.body = {
    name: 'jack-1',
    age: 23,
    sex: 0,
  };
});
