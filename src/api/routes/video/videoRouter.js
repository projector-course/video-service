const Router = require('@koa/router');
const { uploadVideoRoute } = require('./uploadVideoRoute');
const { getVideoRoute } = require('./getVideoRoute');
const { getVideoListRoute } = require('./getVideoListRoute');

const router = new Router();

router
  .get('/', getVideoListRoute)
  .post('/upload', uploadVideoRoute)
  .get('/:video_name', getVideoRoute);

module.exports = { videoRouter: router };
