const Router = require('@koa/router');
const { verifyParams } = require('../../../middlewares/verifyParams');
const { verifyQuery } = require('../../../middlewares/verifyQuery');
const { delVideoRoute } = require('./delVideoRoute');
const { postVideoRoute } = require('./postVideoRoute');
const { getVideoListRoute } = require('./getVideoListRoute');
const { getVideoRoute } = require('./getVideoRoute');

const router = new Router();

router
  .delete('/:id', verifyParams, delVideoRoute)
  .use(verifyQuery)
  .post('/', postVideoRoute)
  .get('/', getVideoListRoute)
  .get('/:id', verifyParams, getVideoRoute);

module.exports = { videoRouter: router };
