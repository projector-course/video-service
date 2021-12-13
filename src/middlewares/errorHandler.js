const { getModuleLogger } = require('../services/logService');

const logger = getModuleLogger(module);
logger.debug('MIDDLWARE CREATED');

async function errorHandler(ctx, next) {
  try {
    await next();
  } catch (e) {
    if (e.status) {
      logger.error(e);
      ctx.status = e.status;
      ctx.body = e.message;
    } else {
      logger.fatal(e);
      ctx.status = 500;
      ctx.body = 'INTERNAL SERVER ERROR';
    }
  }
}

module.exports = { errorHandler };
