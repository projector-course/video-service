const Router = require('@koa/router');
const { isAuth } = require('../../../middlewares/isAuth');
const { FILE_TYPES } = require('../../../services/configService');
const { uploadVideo } = require('../../controllers/videoController/uploadVideo');
const { getVideo } = require('../../controllers/videoController/getVideo');
const { getVideoList } = require('../../controllers/videoController/getVideoList');
const { delVideo } = require('../../controllers/videoController/delVideo');
const { validate } = require('../../../middlewares/validator');

const router = new Router();

/*
  - POST    /videos { data: binary }  => загружаем видео
  - GET     /videos                   => получаем все видео пользователя
  - GET     /videos / :id             => отмечаем просм. видео поль-ем и запускаем стрим
  - DELETE  /videos / :id             => удаляем видео
*/

router.post('/', isAuth, validate.post, async (ctx) => {
  ctx.log.debug('ROUTE: %s', ctx.path);

  const { req, headers, user } = ctx;
  const { 'content-length': size } = headers;

  const fileType = ctx.is(...FILE_TYPES);
  const fileSize = +size;

  const video = await uploadVideo(fileType, fileSize, req, user.id);

  ctx.status = 201;
  ctx.body = video;
});

router.get('/', isAuth, async (ctx) => {
  const { path, user: { id } } = ctx;
  ctx.log.debug('ROUTE: %s', path);
  ctx.body = await getVideoList({ userId: id });
});

router.get('/:id', isAuth, validate.get, async (ctx) => {
  ctx.log.debug('ROUTE: %s', ctx.path);

  const { headers, params: { id }, user } = ctx;
  const { range } = headers;

  const videoFile = await getVideo(id, user.id, range);

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

router.delete('/:id', isAuth, validate.get, async (ctx) => {
  const { path, params: { id }, user } = ctx;
  ctx.log.debug('ROUTE: %s', path);

  const result = await delVideo(id, user.id);
  if (!result) ctx.throw(404);

  ctx.body = 'DELETED';
});

module.exports = { videoRouter: router };
