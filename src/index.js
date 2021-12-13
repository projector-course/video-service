const Koa = require('koa');
const getParser = require('koa-bodyparser');
const { getModuleLogger } = require('./services/logService');
const { prepareServer } = require('./utils/prepareServer');
const { errorHandler } = require('./middlewares/errorHandler');
const { getMetrics } = require('./middlewares/metrics');
const { koaLogger } = require('./middlewares/koaLogger');
const { router } = require('./api/router');
const { PORT, BASE_URL, SERVICE_NAME } = require('./services/configService');

const logger = getModuleLogger(module);
logger.debug('APP CREATED');

prepareServer();

new Koa()
  .use(errorHandler)
  .use(getMetrics)
  .use(koaLogger)
  .use(getParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .on('error', (e) => logger.fatal(e))
  .listen(PORT, () => logger.info(`${SERVICE_NAME} is running on ${BASE_URL}`));

process.on('unhandledRejection', (e) => {
  logger.error(e, 'Unhandled rejection at promise');
  logger.info('Server is still running...');
});

process.on('uncaughtException', (e) => {
  logger.fatal(e, 'Uncaught exception');
  process.nextTick(() => process.exit());
});
