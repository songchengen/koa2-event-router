/**
 * @author songchengen
 * @date 2018/7/19
 * @description api.v1.controller
 */

router.on('get /api/v3/test', async (ctx) => {
  ctx.body = {
    name: 'bob-3',
    age: 23,
    sex: 0,
  };
});
