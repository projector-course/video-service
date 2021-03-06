const { getModuleLogger } = require('../../../services/logService');
const db = require('../../../db/models');

const logger = getModuleLogger(module);
logger.debug('CONTROLLER CREATED');

async function getVideoList(data) {
  return db.videos.findAll({
    where: data,
  });
}

module.exports = { getVideoList };
