const Router = require('@koa/router');
const { uploadVideo } = require('./controllers/uploadVideo');
const { getVideo } = require('./controllers/getVideo');
const { getVideoList } = require('./controllers/getVideoList');
const { getHealth } = require('./controllers/getHealth');

const router = new Router();

router
  .get('/', getVideoList)
  .get('/health', getHealth)
  .post('/upload', uploadVideo)
  .get('/:video_name', getVideo);

module.exports = { router };
