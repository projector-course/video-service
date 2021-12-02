const { delVideo } = require('../../controllers/videoController/delVideo');

const delVideoRoute = async (ctx) => {
  const { path, video } = ctx;
  ctx.log.debug('ROUTE: %s', path);

  const result = await delVideo(video);
  if (!result) ctx.throw(404);

  ctx.body = 'DELETED';
};

module.exports = { delVideoRoute };
