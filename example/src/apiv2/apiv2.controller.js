/**
 * @author songchengen
 * @date 2018/7/19
 * @description api.v1.controller
 */

router.on('get /api/v2/test', async (ctx) => {
  ctx.body = {
    name: 'nick-2',
    age: 23,
    sex: 0,
  };
});
