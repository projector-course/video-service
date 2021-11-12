const Router = require('@koa/router');
const { getHealth } = require('./controllers/healthController/getHealth');
const { videoRouter } = require('./routes/video/videoRouter');

const router = new Router();

router
  .get('/health', async (ctx) => {
    ctx.body = await getHealth();
  })
  .use(videoRouter.routes(), videoRouter.allowedMethods());

module.exports = { router };
