const { getModuleLogger } = require('./logService');
const { GATEWAY_URL, GATEWAY_TOKEN } = require('./configService');
const { post } = require('../utils/httpRequest');

const logger = getModuleLogger(module);
logger.debug('SERVICE CREATED');

async function writeHistory(history) {
  const url = `${GATEWAY_URL}/history`;
  const headers = { 'x-service-token': GATEWAY_TOKEN };
  return post(url, history, { headers });
}

module.exports = { writeHistory };
