const { findVideo } = require('../api/controllers/videoController/findVideo');
const { strToInteger } = require('../utils/helpers');

const verifyVideo = async (ctx, next) => {
  const { params } = ctx;

  const id = strToInteger(params.id);
  if (id === undefined) ctx.throw(400);

  const video = await findVideo(id);
  if (!video) ctx.throw(404);

  ctx.video = video;

  await next();
};

module.exports = { verifyVideo };
