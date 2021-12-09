const fs = require('fs');
const { getModuleLogger } = require('../../../services/logService');
const { findVideo } = require('./findVideo');
const { VERIFICATION_ERROR_TYPE, VerificationError } = require('../../../errors/verificationError');
const { delVideo } = require('./delVideo');
const { CHUNK_SIZE, VIDEO_DIR } = require('../../../services/configService');
const gateway = require('../../../services/gatewayService');

const logger = getModuleLogger(module);
logger.debug('CONTROLLER CREATED');

async function getVideo(id, userId, range) {
  const video = await findVideo({ id });
  if (!video) throw new VerificationError(VERIFICATION_ERROR_TYPE.NOT_FOUND_ERROR);

  const { filename } = video;
  const filePath = `${VIDEO_DIR}/${filename}`;

  let stats;
  try {
    stats = await fs.promises.stat(filePath);
  } catch (e) {
    if (e.code !== 'ENOENT') throw e;
    delVideo(video).catch((err) => logger.error(err));
  }

  const { size: fileSize } = stats;
  const lastByte = fileSize - 1;

  let start = 0;
  let end = lastByte;
  if (range) {
    start = parseInt(range.replace('bytes=', ''), 10) || 0;
    end = start + CHUNK_SIZE - 1;
    if (end > lastByte) end = lastByte;
  }

  const stream = fs.createReadStream(filePath, { start, end })
    .on('error', (e) => { throw e; });

  gateway.writeHistory({ userId, videoId: id }).catch((e) => logger.warn(e.message));

  return {
    stream, fileSize, start, end,
  };
}

module.exports = { getVideo };
