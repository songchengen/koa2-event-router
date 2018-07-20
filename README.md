# koa2-router-event

## Install

```
npm i koa2-event-router -S
```

## Usage

```javascript
// index.js

const Koa = require('koa');
const eventRouter = require('koa2-event-router');

const app = new Koa();


app.use(eventRouter({
  path: `${__dirname}/src`,
  filename: /\.controller\.js$/,
}));

app.listen(9999);

// __dirname/src/**/**.controller.js

router.on('get /api/v2/test', async (ctx) => {
  ctx.body = 'Hello World!';
});

// open http://localhost:9999/api/v2/test

```

## Config

|Name | Type |  Require  | Default | Description|
|---- | ---- |  ----     |  ----   |  ----      |
|path | String| true | null |scanning entrance|
| filename|  RegExp|false| /\\.(js&#124;ts)$/|controller file matching rule|
