const Router = require('@koa/router');
const { uploadVideo } = require('./controllers/upload_video');
const { getVideo } = require('./controllers/get_video');
const { getVideoList } = require('./controllers/get_video_list');

const router = new Router();

router
  .get('/', getVideoList)
  .post('/upload', uploadVideo)
  .get('/:video_name', getVideo);

module.exports = { router };
