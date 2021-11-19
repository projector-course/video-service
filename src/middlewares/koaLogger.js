const { logger } = require('../services/logService');

const resLogger = logger.child({ type: 'RESPONSE' });
const reqLogger = logger.child({ type: 'REQUEST' });

function logRequest(ctx) {
  const { method, url, counter } = ctx;
  const reqMessage = ['REQUEST %s %s', method, url];
  const reqObject = { method, url, counter };

  reqLogger.info(reqObject, ...reqMessage);
}

function logResponse(ctx) {
  const { status, message, time } = ctx;
  const resMessage = ['RESPONSE: %s %s', status, message];
  const resObject = { status, message, restime: time };

  if (status < 300) resLogger.info(resObject, ...resMessage);
  else if (status < 400) resLogger.warn(resObject, ...resMessage);
  else resLogger.error(resObject, ...resMessage);
}

function koaLogger(ctx, next) {
  logRequest(ctx);
  ctx.res.on('close', () => logResponse(ctx));
  ctx.log = logger;
  return next();
}

module.exports = { koaLogger };
