const { getVideoList } = require('../../controllers/videoController/getVideoList');

const getVideoListRoute = async (ctx) => {
  const { path, user } = ctx;
  ctx.log.debug('ROUTE: %s', path);
  ctx.body = await getVideoList(user.id);
};

module.exports = { getVideoListRoute };
