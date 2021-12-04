const { FILE_TYPES } = require('../../../services/configService');
const { uploadVideo } = require('../../controllers/videoController/uploadVideo');

const postVideoRoute = async (ctx) => {
  ctx.log.debug('ROUTE: %s', ctx.path);

  const fileType = ctx.is(...FILE_TYPES);
  if (!fileType) ctx.throw(406, 'Not Acceptable');

  const { user, req, headers } = ctx;
  const { 'content-length': size } = headers;
  const fileSize = +size;
  if (!fileSize) ctx.throw(400, 'Wrong File Size');

  const video = await uploadVideo(fileType, fileSize, req, user);

  ctx.status = 201;
  ctx.body = video;
};

module.exports = { postVideoRoute };
