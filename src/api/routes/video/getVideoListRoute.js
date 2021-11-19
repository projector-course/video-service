const { getVideoList } = require('../../controllers/videoController/getVideoList');

const getVideoListRoute = async (ctx) => {
  ctx.log.debug('ROUTE: %s', ctx.path);
  ctx.body = await getVideoList();
};

module.exports = { getVideoListRoute };
