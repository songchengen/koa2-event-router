# koa2-router-event

## Usage

```javascript
const Koa = require('koa');
const eventRouter = require('../lib');

const app = new Koa();


app.use(eventRouter({
  path: `${__dirname}/src`,
  filename: /\.controller\.js$/,
}));

app.listen(9999);

```

## Config

|Name | Type |  Require  | Default | Description|
|---- | ---- |  ----     |  ----   |  ----      |
|path | String| true | null |scan entry|
| filename|  RegExp|false| /\\.controller\\.(js&#124;ts)&/|controller file matching rule|
