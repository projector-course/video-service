const fs = require('fs');
const { getModuleLogger } = require('../../../services/logService');
const { findVideo } = require('./findVideo');
const db = require('../../../db/models');

const logger = getModuleLogger(module);
logger.debug('CONTROLLER CREATED');

async function delVideo(id, userId) {
  const video = await findVideo({ id, userId });

  const { filename } = video;
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
