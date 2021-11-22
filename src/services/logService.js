const pino = require('pino');
const path = require('path');
const { LOG_LEVEL, LOG_TARGET } = require('./configService');
const { LOGGER_TARGET } = require('./configService');

const level = LOG_LEVEL;
const toConsole = { target: 'pino-pretty', level, options: {} };
const toStdOut = { target: 'pino/file', level, options: { destination: 1 } };
const transport = LOG_TARGET === LOGGER_TARGET.STDOUT ? toStdOut : toConsole;
const options = { level, transport };

const logger = pino(options);

function getModuleLogger(module) {
  const { filename } = module;
  const fileName = path.basename(filename);
  return logger.child({ module: fileName });
}

logger.info('LOGGER IS READY');

module.exports = { logger, getModuleLogger };
