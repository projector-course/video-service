const { getModuleLogger } = require('../../../services/logService');
const db = require('../../../db/models');

const logger = getModuleLogger(module);
logger.debug('CONTROLLER CREATED');

async function getVideoList({ userId }) {
  return db.videos.findAll({
    where: { userId },
  });
}

module.exports = { getVideoList };
