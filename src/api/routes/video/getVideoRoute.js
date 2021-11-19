const { getVideo } = require('../../controllers/videoController/getVideo');

const getVideoRoute = async (ctx) => {
  ctx.log.debug('ROUTE: %s', ctx.path);
  const { params, headers } = ctx;
  const { video_name: videoName } = params;
  const { range } = headers;

  const video = await getVideo(videoName, range)
    .catch((e) => {
      if (e.code === 'ENOENT') ctx.throw(404, 'VIDEO NOT FOUND');
      else ctx.throw(500, e.message);
    });

  const {
    stream, fileSize, start, end,
  } = video;

  ctx.status = 206;
  ctx.set('Accept-Ranges', 'bytes');
  ctx.set('Content-Type', 'video/mp4');
  ctx.set('Content-Range', `bytes ${start}-${end}/${fileSize}`);
  ctx.set('Content-Length', end - start + 1);
  ctx.body = stream;
};

module.exports = { getVideoRoute };
