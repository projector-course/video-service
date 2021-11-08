const fs = require('fs');
const { VIDEO_DIR } = require('../../config');

const getVideoList = async (ctx) => {
  ctx.body = await fs.promises.readdir(VIDEO_DIR, { withFileTypes: true })
    .then((files) => files.filter((file) => file.isFile()))
    .then((files) => files.map(({ name }) => name))
    .catch((e) => ctx.throw(500, e.message));
};

module.exports = { getVideoList };
