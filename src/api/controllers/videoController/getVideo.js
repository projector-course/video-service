const fs = require('fs');
const { CHUNK_SIZE, VIDEO_DIR } = require('../../../services/configService');
const gateway = require('../../../services/gatewayService');
const { getModuleLogger } = require('../../../services/logService');
const { delVideo } = require('./delVideo');

const logger = getModuleLogger(module);
logger.debug('CONTROLLER CREATED');

const getVideo = async (user, video, range) => {
  const { id, filename } = video;
  const filePath = `${VIDEO_DIR}/${filename}`;

  let stats;
  try {
    stats = await fs.promises.stat(filePath);
    gateway.writeHistory(user.id, id).catch((e) => logger.error(e));
  } catch (e) {
    if (e.code === 'ENOENT') delVideo(video).catch((err) => logger.error(err));
    throw e;
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

  return {
    stream, fileSize, start, end,
  };
};

module.exports = { getVideo };
