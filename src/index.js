const Koa = require('koa');
const { PORT, BASE_URL, SERVICE_NAME } = require('./config');
const { router } = require('./api/router');
const { prepareServer } = require('./utils/prepareServer');

prepareServer();

new Koa()
  .use(router.routes())
  .use(router.allowedMethods())
  .on('error', (err) => console.log(err.message))
  .listen(PORT, () => console.log(`${SERVICE_NAME} is running on ${BASE_URL}`));
