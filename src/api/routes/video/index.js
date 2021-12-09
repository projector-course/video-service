const Router = require('@koa/router');
const { FILE_TYPES } = require('../../../services/configService');
const { uploadVideo } = require('../../controllers/videoController/uploadVideo');
const { getVideo } = require('../../controllers/videoController/getVideo');
const { getVideoList } = require('../../controllers/videoController/getVideoList');
const { delVideo } = require('../../controllers/videoController/delVideo');
const { validate } = require('../../../middlewares/validator');
const { VerificationError } = require('../../../errors/verificationError');

const router = new Router();

router.post('/', validate.post, async (ctx) => {
  ctx.log.debug('ROUTE: %s', ctx.path);

  const fileType = ctx.is(...FILE_TYPES);

  const { req, headers, query: { userId } } = ctx;
  const { 'content-length': size } = headers;
  const fileSize = +size;
  if (!fileSize) ctx.throw(400, 'Wrong File Size');

  const video = await uploadVideo(fileType, fileSize, req, userId);

  ctx.status = 201;
  ctx.body = video;
});

router.get('/', validate.getList, async (ctx) => {
  const { path, query } = ctx;
  ctx.log.debug('ROUTE: %s', path);
  ctx.body = await getVideoList(query);
});

router.get('/:id', validate.get, async (ctx) => {
  ctx.log.debug('ROUTE: %s', ctx.path);

  const { headers, params: { id }, query: { userId } } = ctx;
  const { range } = headers;

  const videoFile = await getVideo(id, userId, range)
    .catch((e) => {
      if (e instanceof VerificationError) ctx.throw(404, 'VIDEO NOT FOUND');
      if (e.code === 'ENOENT') ctx.throw(404, 'VIDEO NOT FOUND');
      else throw e;
    });

  const {
    stream, fileSize, start, end,
  } = videoFile;

  ctx.status = 206;
  ctx.set('Accept-Ranges', 'bytes');
  ctx.set('Content-Type', 'video/mp4');
  ctx.set('Content-Range', `bytes ${start}-${end}/${fileSize}`);
  ctx.set('Content-Length', end - start + 1);
  ctx.body = stream;
});

router.delete('/:id', validate.get, async (ctx) => {
  const { path, params: { id }, query: { userId } } = ctx;
  ctx.log.debug('ROUTE: %s', path);

  let result;
  try {
    result = await delVideo({ id, userId });
  } catch (e) {
    if (!(e instanceof VerificationError)) throw e;
    ctx.throw(404);
  }

  if (!result) ctx.throw(404);

  ctx.body = 'DELETED';
});

module.exports = { videoRouter: router };