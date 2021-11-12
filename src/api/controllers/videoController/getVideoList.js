const fs = require('fs');
const { VIDEO_DIR } = require('../../../config');

function getVideoList() {
  return fs.promises.readdir(VIDEO_DIR, { withFileTypes: true })
    .then((files) => files.filter((file) => file.isFile()))
    .then((files) => files.map(({ name }) => name));
}

module.exports = { getVideoList };
