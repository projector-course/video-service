const fs = require('fs');
const { CHUNK_SIZE, VIDEO_DIR } = require('../../config');

const getVideo = async (ctx) => {
  const { video_name: videoName } = ctx.params;
  const fileName = `${VIDEO_DIR}/${videoName}`;

  const stats = await fs.promises.stat(fileName)
    .catch((e) => {
      if (e.code === 'ENOENT') ctx.throw(404, 'VIDEO NOT FOUND');
      else ctx.throw(500, e.message);
    });
  const { size: fileSize } = stats;
  const lastByte = fileSize - 1;

  let start = 0;
  let end = lastByte;
  const { range } = ctx.headers;
  if (range) {
    start = parseInt(range.replace('bytes=', ''), 10) || 0;
    end = start + CHUNK_SIZE - 1;
    if (end > lastByte) end = lastByte;
  }

  const video = fs.createReadStream(fileName, { start, end });

  video.on('error', (e) => {
    ctx.throw(500, e.message);
  });

  ctx.status = 206;
  ctx.set('Accept-Ranges', 'bytes');
  ctx.set('Content-Type', 'video/mp4');
  ctx.set('Content-Range', `bytes ${start}-${end}/${fileSize}`);
  ctx.set('Content-Length', end - start + 1);
  ctx.body = video;
};

module.exports = { getVideo };
