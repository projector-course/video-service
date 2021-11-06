const { VIDEO_DIR } = require('../config');
const { createDir } = require('./helpers');

function prepareServer() {
  createDir(VIDEO_DIR);
  createDir(`${VIDEO_DIR}/tmp`);
}

module.exports = { prepareServer };
