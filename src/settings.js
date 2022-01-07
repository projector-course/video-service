const FILE_TYPES = [
  'mp4',
  'mov',
  'avi',
];

const VIDEO_DIR = 'store';

const STAGE = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
};

const LOGGER_LEVEL = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug',
};

const LOGGER_TARGET = {
  CONSOLE: 'console',
  STDOUT: 'stdout',
};

const AMQP_EXCHANGE_TYPE = 'direct';

module.exports = {
  FILE_TYPES,
  VIDEO_DIR,
  STAGE,
  LOGGER_LEVEL,
  LOGGER_TARGET,
  AMQP_EXCHANGE_TYPE,
};
