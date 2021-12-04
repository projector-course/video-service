const { GATEWAY_URL, HISTORY_SERVICE_PREFIX } = require('./configService');
const { getModuleLogger } = require('./logService');
const { post } = require('../utils/httpRequest');

const logger = getModuleLogger(module);
logger.debug('SERVICE CREATED');

async function writeHistory(history) {
  const url = `${GATEWAY_URL}${HISTORY_SERVICE_PREFIX}`;
  return post(url, history);
}

module.exports = { writeHistory };
