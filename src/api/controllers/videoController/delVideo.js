const fs = require('fs');
const db = require('../../../db/models');
const { getModuleLogger } = require('../../../services/logService');

const logger = getModuleLogger(module);
logger.debug('CONTROLLER CREATED');

const delVideo = async (video) => {
  const { id, filename } = video;
  const delCount = await db.videos.destroy({
    where: { id },
  });

  if (!delCount) return null;

  fs.unlink(filename, (e) => {
    if (e) logger.error(e);
  });

  return true;
};

module.exports = { delVideo };
