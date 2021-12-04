const db = require('../../../db/models');
const { getModuleLogger } = require('../../../services/logService');

const logger = getModuleLogger(module);
logger.debug('CONTROLLER CREATED');

async function getVideoList(user) {
  return db.videos.findAll({
    where: user,
  });
}

module.exports = { getVideoList };
