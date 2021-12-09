const { getModuleLogger } = require('./logService');
const { GATEWAY_URL } = require('./configService');
const { post } = require('../utils/httpRequest');

const logger = getModuleLogger(module);
logger.debug('SERVICE CREATED');

async function writeHistory(history) {
  const url = `${GATEWAY_URL}/history`;
  return post(url, history);
}

module.exports = { writeHistory };
