const { paramsSchema } = require('../api/schema');
const { findVideo } = require('../api/controllers/videoController/findVideo');

const verifyParams = async (ctx, next) => {
  const { params } = ctx;

  const { value, error } = paramsSchema.validate(params);
  if (error) ctx.throw(400, error.message);

  const video = await findVideo(value);
  if (!video) ctx.throw(404);

  ctx.video = video;

  await next();
};

module.exports = { verifyParams };
