const db = require('../../../db/models');
const { getModuleLogger } = require('../../../services/logService');

const logger = getModuleLogger(module);
logger.debug('CONTROLLER CREATED');

async function getVideoList(userId) {
  const result = await db.videos.findAll({
    where: { userId },
  });

  return result;
}

module.exports = { getVideoList };
