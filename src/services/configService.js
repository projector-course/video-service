require('dotenv-defaults').config();
const settings = require('../settings');

/* -- server -- */
const { HOST, PORT } = process.env;
const BASE_URL = `http://${HOST}:${PORT}`;

/* -- logger -- */
const { STAGE, LOGGER_TARGET, LOGGER_LEVEL } = settings;
const { NODE_ENV, LOG_TARGET, LOG_LEVEL } = process.env;
const { isTTY } = process.stdout;

let logTarget = NODE_ENV !== STAGE.PRODUCTION && LOG_TARGET ? LOG_TARGET : LOGGER_TARGET.STDOUT;
if (logTarget === LOGGER_TARGET.CONSOLE && !isTTY) logTarget = LOGGER_TARGET.STDOUT;
const logLevel = NODE_ENV !== STAGE.PRODUCTION && LOG_LEVEL ? LOG_LEVEL : LOGGER_LEVEL.INFO;

/* video stream */
const { CHUNK_SIZE } = process.env;
const chunkSize = parseInt(CHUNK_SIZE, 10) || 0;

module.exports = {
  ...process.env,
  ...settings,
  BASE_URL,
  LOG_TARGET: logTarget,
  LOG_LEVEL: logLevel,
  CHUNK_SIZE: chunkSize,
};
