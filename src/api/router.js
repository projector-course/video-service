const Router = require('@koa/router');
const { getHealthRoute } = require('./routes/health/getHealthRoute');
const { videoRouter } = require('./routes/video');
const { PREFIX: prefix } = require('../services/configService');

const router = new Router({ prefix });

/*
  - GET     /videos/health

  - POST    /videos ? userId= { data: binary }  => загружаем видео
  - GET     /videos ? userId=                   => получаем все видео пользователя
  - GET     /videos / :id ? userId=             => отмечаем просм. видео поль-ем и запускаем стрим
  - DELETE  /videos / :id                       => удаляем видео
*/

router
  .get('/health', getHealthRoute)
  .use(videoRouter.routes(), videoRouter.allowedMethods());

module.exports = { router };
