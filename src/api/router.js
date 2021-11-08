const Router = require('@koa/router');
const { uploadVideo } = require('./controllers/uploadVideo');
const { getVideo } = require('./controllers/getVideo');
const { getVideoList } = require('./controllers/getVideoList');

const router = new Router();

router
  .get('/', getVideoList)
  .post('/upload', uploadVideo)
  .get('/:video_name', getVideo);

module.exports = { router };
