const fs = require('fs');
const db = require('../../../db/models');
const { getModuleLogger } = require('../../../services/logService');

const logger = getModuleLogger(module);
logger.debug('CONTROLLER CREATED');

async function delVideo(video) {
  const { id, filename } = video;
  const result = await db.videos.destroy({
    where: { id },
  });

  if (!result) return result;

  fs.unlink(filename, (e) => {
    if (e) logger.error(e);
  });

  return result;
}

module.exports = { delVideo };
