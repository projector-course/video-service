const fs = require('fs');
const { CHUNK_SIZE, VIDEO_DIR } = require('../../../config');

const getVideo = async (videoName, range) => {
  const fileName = `${VIDEO_DIR}/${videoName}`;

  const stats = await fs.promises.stat(fileName);
  const { size: fileSize } = stats;
  const lastByte = fileSize - 1;

  let start = 0;
  let end = lastByte;
  if (range) {
    start = parseInt(range.replace('bytes=', ''), 10) || 0;
    end = start + CHUNK_SIZE - 1;
    if (end > lastByte) end = lastByte;
  }

  const stream = fs.createReadStream(fileName, { start, end })
    .on('error', (e) => { throw e; });

  return {
    stream, fileSize, start, end,
  };
};

module.exports = { getVideo };
