const fs = require('fs');
const { getModuleLogger } = require('../../../services/logService');
const { findVideo } = require('./findVideo');
const { delVideo } = require('./delVideo');
const { CHUNK_SIZE, VIDEO_DIR } = require('../../../services/configService');
const amqp = require('../../../services/amqp');

const logger = getModuleLogger(module);
logger.debug('CONTROLLER CREATED');

async function getVideo(id, userId, range) {
  const video = await findVideo({ id });

  const { filename } = video;
  const filePath = `${VIDEO_DIR}/${filename}`;

  const stats = await fs.promises.stat(filePath)
    .catch((e) => {
      if (e.code === 'ENOENT') {
        delVideo(video).catch((err) => logger.error(err));
      }
      throw e;
    });

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

  amqp.publish({ userId, videoId: id }).catch((e) => logger.error(e));

  return {
    stream, fileSize, start, end,
  };
}

module.exports = { getVideo };
