const Koa = require('koa');
const { PORT, BASE_URL } = require('./config');
const { router } = require('./api/router');

new Koa()
  .use(router.routes())
  .use(router.allowedMethods())
  .on('error', (err) => console.log(err.message))
  .listen(PORT, () => console.log(`Server is running on ${BASE_URL}`));
