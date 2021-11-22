const { VIDEO_DIR } = require('../services/configService');
const { createDir } = require('./createDir');

function prepareServer() {
  createDir(VIDEO_DIR);
  createDir(`${VIDEO_DIR}/tmp`);
}

module.exports = { prepareServer };
