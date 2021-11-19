const Router = require('@koa/router');
const { getHealthRoute } = require('./routes/health/getHealthRoute');
const { videoRouter } = require('./routes/video/videoRouter');

const router = new Router();

router
  .get('/health', getHealthRoute)
  .use(videoRouter.routes(), videoRouter.allowedMethods());

module.exports = { router };
