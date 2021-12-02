const Router = require('@koa/router');
const { verifyUser } = require('../../../middlewares/verifyUser');
const { delVideoRoute } = require('./delVideoRoute');
const { postVideoRoute } = require('./postVideoRoute');
const { getVideoListRoute } = require('./getVideoListRoute');
const { getVideoRoute } = require('./getVideoRoute');
const { verifyVideo } = require('../../../middlewares/verifyVideo');

const router = new Router();

router
  .delete('/:id', verifyVideo, delVideoRoute)
  .use(verifyUser)
  .post('/', postVideoRoute)
  .get('/', getVideoListRoute)
  .get('/:id', verifyVideo, getVideoRoute);

module.exports = { videoRouter: router };
