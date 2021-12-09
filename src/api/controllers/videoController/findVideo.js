const { getModuleLogger } = require('../../../services/logService');
const db = require('../../../db/models');

const logger = getModuleLogger(module);
logger.debug('CONTROLLER CREATED');

async function findVideo(data) {
  const result = await db.videos.findOne({
    where: data,
  });

  const { dataValues: video } = result || {};
  return video;
}

module.exports = { findVideo };
