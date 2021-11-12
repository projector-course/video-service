const Router = require('@koa/router');
const { uploadVideoRoute } = require('./uploadVideoRoute');
const { getVideoRoute } = require('./getVideoRoute');
const { getVideoList } = require('../../controllers/videoController/getVideoList');

const router = new Router();

router
  .get('/', async (ctx) => { ctx.body = await getVideoList(); })
  .post('/upload', uploadVideoRoute)
  .get('/:video_name', getVideoRoute);

module.exports = { videoRouter: router };
