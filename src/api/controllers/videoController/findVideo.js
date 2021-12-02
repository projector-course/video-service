const db = require('../../../db/models');
const { getModuleLogger } = require('../../../services/logService');

const logger = getModuleLogger(module);
logger.debug('CONTROLLER CREATED');

const findVideo = async (id) => {
  const result = await db.videos.findOne({
    where: { id },
  });

  const { dataValues: video } = result || {};
  return video;
};

module.exports = { findVideo };
