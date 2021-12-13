const { getModuleLogger } = require('../../../services/logService');
const db = require('../../../db/models');
const { VERIFICATION_ERROR_TYPE, VerificationError } = require('../../../errors/verificationError');

const logger = getModuleLogger(module);
logger.debug('CONTROLLER CREATED');

async function findVideo(data) {
  const result = await db.videos.findOne({
    where: data,
  });

  const { dataValues: video } = result || {};
  if (video) return video;

  throw new VerificationError(VERIFICATION_ERROR_TYPE.NOT_FOUND_ERROR, 'VIDEO NOT FOUND');
}

module.exports = { findVideo };
